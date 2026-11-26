/*
# Seed placeholder content for Upper Hands Foundation

1. Purpose
- Seeds the site with clearly-labeled placeholder content that the foundation
  can later replace in the admin dashboard. Nothing here is presented as a
  verified fact: impact stats are seeded with is_verified = false (hidden until
  verified), bank details are empty strings, and program/project copy is
  marked as to be confirmed.

2. Seeded Tables
- programs (8 rows, active, with placeholder copy)
- projects (3 rows, draft status = hidden from public until activated)
- impact_stats (5 rows, is_verified = false so they are not shown)
- faqs (6 rows)
- site_settings (single row with empty contact/bank placeholders)

3. Security
- No policy changes; rows inherit the RLS policies from the previous migration.

4. Notes
- Rows are referenced by stable slugs/keys so re-running is safe (ON CONFLICT DO NOTHING).
*/

INSERT INTO programs (slug, title, summary, description, icon, sort_order) VALUES
('education-learning', 'Education & Learning', 'Supporting children and young people with the tools, resources and encouragement they need to learn and thrive.', 'Upper Hands Foundation is working to expand access to quality education for children from underserved families. Planned activities include support with school supplies, learning centers, and guidance for students at risk of dropping out. Details of this program will be confirmed and published by the foundation.', 'book-open', 1),
('healthcare-medical-assistance', 'Healthcare & Medical Assistance', 'Helping vulnerable patients access essential treatment, medicines and medical support.', 'The foundation aims to assist patients who cannot afford treatment with access to medical consultations, essential medicines and hospital support. Program scope and active services will be published once confirmed by the foundation.', 'stethoscope', 2),
('food-distribution', 'Food Distribution', 'Standing with families facing hunger through organized food distribution.', 'Planned food assistance includes ration distribution to families in need, special Ramadan food drives, and support for daily-wage workers during difficult periods. Specific distribution schedules will be announced by the foundation.', 'utensils', 3),
('community-welfare', 'Community Welfare', 'Strengthening communities through welfare initiatives designed with the people they serve.', 'Community welfare activities focus on supporting widows, the elderly, and families facing hardship, helping them live with dignity. Program details will be confirmed and published by the foundation.', 'users', 4),
('orphan-child-support', 'Orphan & Child Support', 'Protecting the childhood of orphaned children with care, education and emotional support.', 'The foundation intends to support orphaned children with their education, health and everyday needs so they can grow up with the same opportunities as their peers. Program details will be published once confirmed.', 'baby', 5),
('emergency-disaster-relief', 'Emergency & Disaster Relief', 'Responding quickly when floods, earthquakes or other disasters strike communities.', 'Pakistan is frequently affected by natural disasters. The foundation is preparing a rapid response capability to deliver emergency food, shelter and medical help when disasters occur. Response capabilities will be documented as they are established.', 'life-buoy', 6),
('clean-water-basic-necessities', 'Clean Water & Basic Necessities', 'Bringing safe drinking water and everyday essentials to underserved communities.', 'Planned activities include installation and maintenance of water wells and hand pumps in areas without reliable clean water, alongside other basic necessities. Project locations will be published once confirmed.', 'droplets', 7),
('social-development', 'Social Development', 'Building long-term community strength through skills training and self-reliance programs.', 'The foundation plans to offer vocational and skills training that helps people earn a sustainable income and support their families. Program structure will be confirmed and published by the foundation.', 'trending-up', 8)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO projects (slug, title, summary, description, status, target_amount_pkr, raised_amount_pkr, is_featured) VALUES
('ramadan-food-drive', 'Ramadan Food Drive', 'Provide food rations to families during the holy month of Ramadan.', 'This planned campaign aims to distribute food ration packages to families in need during Ramadan. The campaign will be published with verified targets once confirmed by the foundation.', 'draft', 0, 0, false),
('winter-shelter-support', 'Winter Shelter Support', 'Help homeless families stay warm through the harsh winter months.', 'This planned campaign aims to provide blankets, warm clothing and shelter support during winter. Details will be published once confirmed by the foundation.', 'draft', 0, 0, false),
('clean-water-wells', 'Clean Water Wells', 'Install water wells in communities without access to safe drinking water.', 'This planned campaign aims to install hand pumps and water wells in underserved villages. Locations and targets will be published once verified by the foundation.', 'draft', 0, 0, false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO impact_stats (key, label, value, sort_order) VALUES
('lives_impacted', 'Lives Impacted', 0, 1),
('families_supported', 'Families Supported', 0, 2),
('projects_completed', 'Projects Completed', 0, 3),
('volunteers_engaged', 'Volunteers Engaged', 0, 4),
('communities_reached', 'Communities Reached', 0, 5)
ON CONFLICT (key) DO NOTHING;

INSERT INTO faqs (question, answer, sort_order) VALUES
('How can I donate to Upper Hands Foundation?', 'You can donate through this website by choosing an amount and a cause. Once the foundation''s official payment methods are activated, bank transfer, JazzCash, Easypaisa and card options will be shown here with the foundation''s verified account details.', 1),
('Is my donation eligible for tax credit?', 'Tax receipt information will be published here once confirmed by the foundation''s official registration documents.', 2),
('How do I know my donation reaches those in need?', 'The foundation is committed to transparency. Annual reports, financial statements and utilization summaries will be published in the Transparency section of this website.', 3),
('Can I volunteer with the foundation?', 'Yes. Please complete the volunteer form on the Become a Volunteer page and the foundation team will contact you when opportunities matching your skills and location arise.', 4),
('Can organizations partner with Upper Hands Foundation?', 'Yes. Partnerships with businesses, NGOs and community organizations are welcome. Please submit an inquiry through the Partnerships page.', 5),
('How can I verify the foundation''s registration?', 'Official registration details will be published in the Transparency section once confirmed by the foundation.', 6)
ON CONFLICT DO NOTHING;

INSERT INTO site_settings (id, tagline) VALUES (1, 'Together, we can make a difference.')
ON CONFLICT (id) DO NOTHING;
