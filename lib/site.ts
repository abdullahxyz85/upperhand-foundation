export const SITE_URL = 'https://upperhandsfoundation.com';

export const siteConfig = {
  name: 'Upper Hands Foundation',
  shortName: 'UHF',
  tagline: 'Together, We Can Make a Difference.',
  description:
    'Upper Hands Foundation is a humanitarian welfare organization based in Pakistan, working to bring hope, support communities and transform lives with dignity.',
  url: SITE_URL,
};

/**
 * EDITABLE PLACEHOLDERS — replace with the foundation's official details.
 * These values are intentionally placeholder text, not real contact information.
 */
export const contactPlaceholders = {
  address: 'Address to be announced — Upper Hands Foundation, Pakistan',
  phone: '+92 XXX XXXXXXX',
  phoneHref: '',
  whatsapp: '',
  email: 'info@upperhandsfoundation.com',
  officeHours: 'Monday – Saturday, 9:00 AM – 5:00 PM (PKT)',
};

export const bankPlaceholders = {
  configured: false,
  note:
    'Official bank account details will be published here once verified by the foundation.',
  bankName: '',
  accountTitle: '',
  accountNumber: '',
  iban: '',
  walletApps: ['JazzCash', 'Easypaisa', 'Bank Transfer', 'Debit / Credit Card'],
};

export type NavChild = { label: string; href: string; description?: string };

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About the Foundation', href: '/about', description: 'Who we are and what drives us' },
      { label: 'Mission & Vision', href: '/about/mission-vision', description: 'Our purpose and direction' },
      { label: 'Leadership Team', href: '/about/leadership', description: 'The people guiding our work' },
      { label: 'Transparency', href: '/about/transparency', description: 'Documents and accountability' },
    ],
  },
  {
    label: 'Our Programs',
    href: '/programs',
    children: [
      { label: 'All Programs', href: '/programs', description: 'Everything we do' },
      { label: 'Education & Learning', href: '/programs/education-learning' },
      { label: 'Healthcare & Medical Assistance', href: '/programs/healthcare-medical-assistance' },
      { label: 'Food Distribution', href: '/programs/food-distribution' },
      { label: 'Community Welfare', href: '/programs/community-welfare' },
      { label: 'Orphan & Child Support', href: '/programs/orphan-child-support' },
      { label: 'Emergency & Disaster Relief', href: '/programs/emergency-disaster-relief' },
      { label: 'Clean Water & Basic Necessities', href: '/programs/clean-water-basic-necessities' },
      { label: 'Social Development', href: '/programs/social-development' },
    ],
  },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Our Impact', href: '/impact' },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      { label: 'Become a Volunteer', href: '/get-involved/volunteer', description: 'Give your time and skills' },
      { label: 'Partnerships', href: '/get-involved/partnerships', description: 'Partner with our mission' },
      { label: 'Donate', href: '/donate', description: 'Support our cause' },
    ],
  },
  {
    label: 'Media & Stories',
    href: '/stories',
    children: [
      { label: 'Success Stories', href: '/stories', description: 'Lives touched by kindness' },
      { label: 'News & Updates', href: '/news', description: 'Latest from the foundation' },
      { label: 'Gallery', href: '/gallery', description: 'Moments from our work' },
      { label: 'FAQs', href: '/faqs', description: 'Answers to common questions' },
    ],
  },
  { label: 'Contact Us', href: '/contact' },
];
