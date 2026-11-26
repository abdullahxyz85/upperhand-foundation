export type FieldDef = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'checkbox' | 'select';
  options?: string[];
};

export type CollectionConfig = {
  key: string;
  label: string;
  table: string;
  order: string;
  single?: boolean;
  listFields: string[];
  fields: FieldDef[];
};

export type SubmissionConfig = {
  key: string;
  label: string;
  table: string;
  columns: { name: string; label: string }[];
  statuses?: string[];
};

export const collections: CollectionConfig[] = [
  {
    key: 'programs',
    label: 'Programs',
    table: 'programs',
    order: 'sort_order',
    listFields: ['title', 'slug', 'is_active'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (URL)', type: 'text' },
      { name: 'summary', label: 'Short Summary', type: 'textarea' },
      { name: 'description', label: 'Full Description', type: 'textarea' },
      { name: 'icon', label: 'Icon', type: 'select', options: ['heart', 'book-open', 'stethoscope', 'utensils', 'users', 'baby', 'life-buoy', 'droplets', 'trending-up'] },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
      { name: 'is_active', label: 'Active (visible on website)', type: 'checkbox' },
    ],
  },
  {
    key: 'projects',
    label: 'Projects & Campaigns',
    table: 'projects',
    order: 'created_at',
    listFields: ['title', 'status', 'target_amount_pkr', 'raised_amount_pkr'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (URL)', type: 'text' },
      { name: 'summary', label: 'Short Summary', type: 'textarea' },
      { name: 'description', label: 'Full Description', type: 'textarea' },
      { name: 'status', label: 'Status (draft = hidden)', type: 'select', options: ['draft', 'active', 'completed', 'paused'] },
      { name: 'target_amount_pkr', label: 'Fundraising Target (PKR)', type: 'number' },
      { name: 'raised_amount_pkr', label: 'Amount Raised (PKR)', type: 'number' },
      { name: 'is_featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  {
    key: 'posts',
    label: 'News & Blog',
    table: 'posts',
    order: '-published_at',
    listFields: ['title', 'category', 'is_published'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (URL)', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Body (blank line = new paragraph)', type: 'textarea' },
      { name: 'image_url', label: 'Image URL', type: 'text' },
      { name: 'is_published', label: 'Published', type: 'checkbox' },
    ],
  },
  {
    key: 'stories',
    label: 'Success Stories',
    table: 'stories',
    order: '-created_at',
    listFields: ['title', 'location', 'is_published'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'slug', label: 'Slug (URL)', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Full Story', type: 'textarea' },
      { name: 'is_published', label: 'Published (with consent)', type: 'checkbox' },
    ],
  },
  {
    key: 'team_members',
    label: 'Leadership Team',
    table: 'team_members',
    order: 'sort_order',
    listFields: ['name', 'role'],
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'bio', label: 'Biography', type: 'textarea' },
      { name: 'photo_url', label: 'Photo URL', type: 'text' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
  },
  {
    key: 'gallery_images',
    label: 'Gallery',
    table: 'gallery_images',
    order: 'sort_order',
    listFields: ['title', 'category'],
    fields: [
      { name: 'title', label: 'Caption', type: 'text' },
      { name: 'image_url', label: 'Image URL', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
  },
  {
    key: 'impact_stats',
    label: 'Impact Statistics',
    table: 'impact_stats',
    order: 'sort_order',
    listFields: ['label', 'value', 'is_verified'],
    fields: [
      { name: 'key', label: 'Key (unique)', type: 'text' },
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'value', label: 'Value', type: 'number' },
      { name: 'suffix', label: 'Suffix (e.g. +)', type: 'text' },
      { name: 'is_verified', label: 'Verified (shown on website)', type: 'checkbox' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
  },
  {
    key: 'documents',
    label: 'Transparency Documents',
    table: 'documents',
    order: '-year',
    listFields: ['title', 'category', 'year'],
    fields: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'file_url', label: 'File URL', type: 'text' },
      { name: 'year', label: 'Year', type: 'number' },
    ],
  },
  {
    key: 'faqs',
    label: 'FAQs',
    table: 'faqs',
    order: 'sort_order',
    listFields: ['question'],
    fields: [
      { name: 'question', label: 'Question', type: 'text' },
      { name: 'answer', label: 'Answer', type: 'textarea' },
      { name: 'sort_order', label: 'Sort Order', type: 'number' },
    ],
  },
  {
    key: 'site_settings',
    label: 'Site Settings',
    table: 'site_settings',
    order: 'id',
    single: true,
    listFields: [],
    fields: [
      { name: 'org_name', label: 'Organization Name', type: 'text' },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'whatsapp', label: 'WhatsApp (digits only, e.g. 923001234567)', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'bank_name', label: 'Bank Name', type: 'text' },
      { name: 'account_title', label: 'Account Title', type: 'text' },
      { name: 'account_number', label: 'Account Number', type: 'text' },
      { name: 'iban', label: 'IBAN', type: 'text' },
      { name: 'facebook_url', label: 'Facebook URL', type: 'text' },
      { name: 'instagram_url', label: 'Instagram URL', type: 'text' },
      { name: 'twitter_url', label: 'Twitter/X URL', type: 'text' },
      { name: 'youtube_url', label: 'YouTube URL', type: 'text' },
      { name: 'linkedin_url', label: 'LinkedIn URL', type: 'text' },
    ],
  },
];

export const submissions: SubmissionConfig[] = [
  {
    key: 'donations',
    label: 'Donations',
    table: 'donations',
    columns: [
      { name: 'reference', label: 'Reference' },
      { name: 'donor_name', label: 'Donor' },
      { name: 'email', label: 'Email' },
      { name: 'amount_pkr', label: 'Amount (PKR)' },
      { name: 'donation_type', label: 'Type' },
      { name: 'category', label: 'Category' },
      { name: 'status', label: 'Status' },
      { name: 'created_at', label: 'Date' },
    ],
    statuses: ['pending', 'confirmed', 'failed', 'refunded'],
  },
  {
    key: 'volunteer_applications',
    label: 'Volunteer Applications',
    table: 'volunteer_applications',
    columns: [
      { name: 'full_name', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'city', label: 'City' },
      { name: 'skills', label: 'Skills' },
      { name: 'availability', label: 'Availability' },
      { name: 'status', label: 'Status' },
      { name: 'created_at', label: 'Date' },
    ],
    statuses: ['new', 'reviewing', 'accepted', 'rejected'],
  },
  {
    key: 'contact_messages',
    label: 'Contact Messages',
    table: 'contact_messages',
    columns: [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'subject', label: 'Subject' },
      { name: 'message', label: 'Message' },
      { name: 'status', label: 'Status' },
      { name: 'created_at', label: 'Date' },
    ],
    statuses: ['new', 'responded'],
  },
  {
    key: 'partnership_inquiries',
    label: 'Partnership Inquiries',
    table: 'partnership_inquiries',
    columns: [
      { name: 'org_name', label: 'Organization' },
      { name: 'contact_name', label: 'Contact' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
      { name: 'message', label: 'Message' },
      { name: 'created_at', label: 'Date' },
    ],
  },
  {
    key: 'newsletter_subscribers',
    label: 'Newsletter Subscribers',
    table: 'newsletter_subscribers',
    columns: [
      { name: 'email', label: 'Email' },
      { name: 'created_at', label: 'Subscribed At' },
    ],
  },
];
