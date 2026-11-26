/*
# Admin access control (role-based management)

1. Purpose
- Enables foundation administrators (authenticated users whose email is in an
  allowlist) to manage content and review submissions through the admin dashboard.
- Public visitors (anon) remain restricted to read-only content + insert-only
  submissions, exactly as before.

2. New Table
- `admin_allowlist`: email addresses permitted to administer the site.
  - email (text, primary key)
  - added_at (timestamptz)

3. New Function
- `is_admin()` (security definer, stable): true when the caller is authenticated
  and their JWT email is in admin_allowlist. Used by RLS policies so the
  allowlist table itself never needs to be publicly readable.

4. Security Changes
- Content tables (programs, projects, impact_stats, team_members, stories,
  posts, gallery_images, documents, faqs, site_settings): full CRUD for
  authenticated admins via is_admin().
- Submission tables (donations, volunteer_applications, contact_messages,
  partnership_inquiries, newsletter_subscribers): SELECT + UPDATE for admins
  (review, update status). No DELETE for anyone except service_role.
- Grants updated accordingly. No public policy is loosened.

5. Notes
- Admin accounts are created by email/password sign-up on the admin sign-in
  page; they gain access only after their email is added to admin_allowlist
  (by an existing admin or via SQL with service access).
*/

CREATE TABLE IF NOT EXISTS admin_allowlist (
  email text PRIMARY KEY,
  added_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_allowlist ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON admin_allowlist TO service_role;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM admin_allowlist
      WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  );
$$;

REVOKE EXECUTE ON FUNCTION is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- ============ ADMIN POLICIES: CONTENT TABLES ============
DROP POLICY IF EXISTS "Admins manage programs" ON programs;
CREATE POLICY "Admins manage programs" ON programs
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage projects" ON projects;
CREATE POLICY "Admins manage projects" ON projects
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage impact stats" ON impact_stats;
CREATE POLICY "Admins manage impact stats" ON impact_stats
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage team" ON team_members;
CREATE POLICY "Admins manage team" ON team_members
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage stories" ON stories;
CREATE POLICY "Admins manage stories" ON stories
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage posts" ON posts;
CREATE POLICY "Admins manage posts" ON posts
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage gallery" ON gallery_images;
CREATE POLICY "Admins manage gallery" ON gallery_images
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage documents" ON documents;
CREATE POLICY "Admins manage documents" ON documents
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins manage faqs" ON faqs;
CREATE POLICY "Admins manage faqs" ON faqs
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins update settings" ON site_settings;
CREATE POLICY "Admins update settings" ON site_settings
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ============ ADMIN POLICIES: SUBMISSIONS (review + status) ============
DROP POLICY IF EXISTS "Admins review donations" ON donations;
CREATE POLICY "Admins review donations" ON donations
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins review volunteer applications" ON volunteer_applications;
CREATE POLICY "Admins review volunteer applications" ON volunteer_applications
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins review contact messages" ON contact_messages;
CREATE POLICY "Admins review contact messages" ON contact_messages
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins review partnership inquiries" ON partnership_inquiries;
CREATE POLICY "Admins review partnership inquiries" ON partnership_inquiries
TO authenticated USING (is_admin()) WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins read subscribers" ON newsletter_subscribers;
CREATE POLICY "Admins read subscribers" ON newsletter_subscribers
TO authenticated USING (is_admin());

-- ============ GRANTS ============
GRANT SELECT, INSERT, UPDATE, DELETE ON programs, projects, impact_stats, team_members, stories, posts, gallery_images, documents, faqs, site_settings TO authenticated;
GRANT SELECT, UPDATE ON donations, volunteer_applications, contact_messages, partnership_inquiries, newsletter_subscribers TO authenticated;
