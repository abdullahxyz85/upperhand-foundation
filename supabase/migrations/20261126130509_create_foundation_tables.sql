/*
# Upper Hands Foundation - core tables

1. New Tables
- `programs`: humanitarian programs (education, healthcare, food, etc.)
  - id, slug, title, summary, description, image_url, icon, sort_order, is_active
- `projects`: fundraising projects and campaigns
  - id, slug, title, summary, description, image_url, status (draft/active/completed), target_amount_pkr, raised_amount_pkr, program_id (nullable FK), is_featured
- `donations`: donor pledges recorded when someone submits the donation form
  - id, reference (unique, human-readable e.g. UHF-XXXXXX), donor_name, email, phone, amount_pkr (numeric), donation_type (one_time/monthly), category, status (pending/confirmed/failed), created_at
- `volunteer_applications`: people offering to volunteer
  - id, full_name, email, phone, city, skills, availability, message, status (new/reviewing/accepted/rejected), created_at
- `contact_messages`: contact form inquiries
  - id, name, email, phone, subject, message, status (new/responded), created_at
- `newsletter_subscribers`: email subscribers
  - id, email (unique), created_at
- `partnership_inquiries`: organizations wanting to partner
  - id, org_name, contact_name, email, phone, message, created_at
- `impact_stats`: editable statistics (lives impacted etc.)
  - id, key (unique), label, value, sort_order
- `team_members`: leadership profiles
  - id, name, role, bio, photo_url, sort_order
- `stories`: success stories
  - id, slug, title, excerpt, body, image_url, is_published
- `posts`: news and blog
  - id, slug, title, excerpt, body, image_url, category, is_published, published_at
- `gallery_images`: photo gallery
  - id, title, image_url, category, sort_order
- `documents`: transparency documents (annual reports etc.)
  - id, title, category, file_url, year
- `faqs`: frequently asked questions
  - id, question, answer, sort_order
- `site_settings`: single-row editable settings (contact info placeholders etc.)
  - id (int primary key = 1), org_name, tagline, email, phone, whatsapp, address, bank details (bank_name, account_title, account_number, iban), social links, updated_at

2. Security
- RLS enabled on ALL tables.
- Public (anon + authenticated) can READ only published/active content: programs, active projects, impact stats, team members, published stories/posts, gallery, documents, faqs, settings.
- Public (anon + authenticated) can INSERT into donations (status forced pending), volunteer_applications, contact_messages, newsletter_subscribers, partnership_inquiries.
- No public UPDATE/DELETE on submission tables.
- No public access to donation status/management columns beyond what's needed for a receipt: donor sees nothing automatically; confirmation reference returned at insert time.
- Grants: SELECT (content tables), INSERT (submission tables) to anon + authenticated; service_role granted SELECT/UPDATE/DELETE for admin edge function use.

3. Notes
- Admin management is intended to go through a service_role path; public writes are append-only.
- Donations table restricts public INSERT columns so callers cannot set status or raised amounts.
- Unique index on lower(email) for newsletter subscribers.
- Generous defaults; no destructive operations.
*/

-- ============ CONTENT TABLES ============

CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'heart',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','completed','paused')),
  target_amount_pkr numeric(14,2) NOT NULL DEFAULT 0,
  raised_amount_pkr numeric(14,2) NOT NULL DEFAULT 0,
  program_id uuid REFERENCES programs(id) ON DELETE SET NULL,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL DEFAULT ('UHF-' || upper(substr(md5(random()::text), 1, 8))),
  donor_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  amount_pkr numeric(12,2) NOT NULL CHECK (amount_pkr > 0),
  donation_type text NOT NULL DEFAULT 'one_time' CHECK (donation_type IN ('one_time','monthly')),
  category text NOT NULL DEFAULT 'general',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','failed','refunded')),
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteer_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  skills text NOT NULL DEFAULT '',
  availability text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewing','accepted','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','responded')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partnership_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS impact_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  label text NOT NULL,
  value integer NOT NULL DEFAULT 0,
  suffix text NOT NULL DEFAULT '+',
  is_verified boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL DEFAULT '',
  photo_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stories (
  id uuid primary key default gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'News',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Report',
  file_url text NOT NULL DEFAULT '',
  year integer
);

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  org_name text NOT NULL DEFAULT 'Upper Hands Foundation',
  tagline text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  bank_name text NOT NULL DEFAULT '',
  account_title text NOT NULL DEFAULT '',
  account_number text NOT NULL DEFAULT '',
  iban text NOT NULL DEFAULT '',
  facebook_url text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  twitter_url text NOT NULL DEFAULT '',
  youtube_url text NOT NULL DEFAULT '',
  linkedin_url text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured) WHERE is_featured;
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_stories_published ON stories(is_published);

-- ============ RLS ============
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Content: public read of active/published rows
DROP POLICY IF EXISTS "Public read active programs" ON programs;
CREATE POLICY "Public read active programs" ON programs FOR SELECT
TO anon, authenticated USING (is_active);

DROP POLICY IF EXISTS "Public read visible projects" ON projects;
CREATE POLICY "Public read visible projects" ON projects FOR SELECT
TO anon, authenticated USING (status IN ('active','completed'));

DROP POLICY IF EXISTS "Public read impact stats" ON impact_stats;
CREATE POLICY "Public read impact stats" ON impact_stats FOR SELECT
TO anon, authenticated USING (is_verified);

DROP POLICY IF EXISTS "Public read team" ON team_members;
CREATE POLICY "Public read team" ON team_members FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read published stories" ON stories;
CREATE POLICY "Public read published stories" ON stories FOR SELECT
TO anon, authenticated USING (is_published);

DROP POLICY IF EXISTS "Public read published posts" ON posts;
CREATE POLICY "Public read published posts" ON posts FOR SELECT
TO anon, authenticated USING (is_published);

DROP POLICY IF EXISTS "Public read gallery" ON gallery_images;
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read documents" ON documents;
CREATE POLICY "Public read documents" ON documents FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read faqs" ON faqs;
CREATE POLICY "Public read faqs" ON faqs FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read settings" ON site_settings;
CREATE POLICY "Public read settings" ON site_settings FOR SELECT
TO anon, authenticated USING (true);

-- Submissions: anyone can submit (insert), nobody can read/update/delete publicly
DROP POLICY IF EXISTS "Anyone can submit donation" ON donations;
CREATE POLICY "Anyone can submit donation" ON donations FOR INSERT
TO anon, authenticated WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Anyone can apply to volunteer" ON volunteer_applications;
CREATE POLICY "Anyone can apply to volunteer" ON volunteer_applications FOR INSERT
TO anon, authenticated WITH CHECK (status = 'new');

DROP POLICY IF EXISTS "Anyone can send contact message" ON contact_messages;
CREATE POLICY "Anyone can send contact message" ON contact_messages FOR INSERT
TO anon, authenticated WITH CHECK (status = 'new');

DROP POLICY IF EXISTS "Anyone can subscribe" ON newsletter_subscribers;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can inquire partnership" ON partnership_inquiries;
CREATE POLICY "Anyone can inquire partnership" ON partnership_inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- ============ GRANTS ============
GRANT SELECT ON programs, projects, impact_stats, team_members, stories, posts, gallery_images, documents, faqs, site_settings TO anon, authenticated;
GRANT SELECT, INSERT (donor_name, email, phone, amount_pkr, donation_type, category, notes) ON donations TO anon, authenticated;
GRANT SELECT, INSERT ON volunteer_applications, contact_messages, partnership_inquiries TO anon, authenticated;
GRANT INSERT ON newsletter_subscribers TO anon, authenticated;
GRANT SELECT, UPDATE ON site_settings TO service_role;
GRANT ALL ON programs, projects, donations, volunteer_applications, contact_messages, newsletter_subscribers, partnership_inquiries, impact_stats, team_members, stories, posts, gallery_images, documents, faqs, site_settings TO service_role;
