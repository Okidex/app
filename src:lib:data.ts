import type { User } from './types';

export const currentUser: User = {
  id: 'user-0',
  name: 'Alex Doe',
  avatarUrl: 'https://placehold.co/100x100.png',
  role: 'Founder',
  profile: {
    headline: 'Founder & CEO at InnovateX',
    summary: 'Serial entrepreneur with a passion for building disruptive technologies. Seeking seed funding for a new venture in the AI space.',
    experience: [
      {
        title: 'CEO & Founder',
        company: 'InnovateX',
        duration: '2022 - Present',
      },
      {
        title: 'Product Manager',
        company: 'TechCorp',
        duration: '2019 - 2022',
      },
    ],
    interests: ['AI', 'Machine Learning', 'SaaS'],
    investmentCriteria: 'Seeking pre-seed or seed stage funding ($50k - $250k).',
    pastSuccesses: []
  },
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    avatarUrl: 'https://placehold.co/100x100.png',
    role: 'Investor',
    profile: {
      headline: 'Venture Capitalist at Future Ventures',
      summary: 'Investing in early-stage startups that are changing the world. Focus on fintech and healthcare.',
      experience: [
        {
          title: 'Partner',
          company: 'Future Ventures',
          duration: '2018 - Present',
        },
      ],
      interests: ['Fintech', 'Digital Health', 'Impact Investing'],
      investmentCriteria: 'Lead investor for Series A rounds in fintech and healthcare. Ticket size $1M - $5M.',
      pastSuccesses: ['Led Series A for HealthPlus (Acquired by a major tech company)', 'Early investor in FinPal (IPO in 2023)']
    },
  },
  {
    id: 'user-2',
    name: 'David Lee',
    avatarUrl: 'https://placehold.co/100x100.png',
    role: 'Talent',
    profile: {
      headline: 'Senior Software Engineer with AI/ML Expertise',
      summary: '10+ years of experience building scalable software solutions. Looking for a leadership role in a fast-growing tech startup.',
      experience: [
        {
          title: 'Lead ML Engineer',
          company: 'DataDriven Inc.',
          duration: '2020 - Present',
        },
        {
          title: 'Software Engineer',
          company: 'Appify',
          duration: '2015 - 2020',
        },
      ],
      interests: ['Python', 'TensorFlow', 'Cloud Computing'],
      investmentCriteria: '',
      pastSuccesses: ['Developed core algorithm for a product with 1M+ users.']
    },
  },
  {
    id: 'user-3',
    name: 'Maria Garcia',
    avatarUrl: 'https://placehold.co/100x100.png',
    role: 'Founder',
    profile: {
      headline: 'Founder of EcoWear - Sustainable Fashion Brand',
      summary: 'Building a direct-to-consumer brand for sustainable and ethical fashion. Looking for strategic partners and seed funding.',
      experience: [
        {
          title: 'Founder',
          company: 'EcoWear',
          duration: '2021 - Present',
        },
      ],
      interests: ['E-commerce', 'Sustainability', 'Fashion Tech'],
      investmentCriteria: 'Seeking $500k in seed funding to scale production and marketing.',
      pastSuccesses: ['Grew EcoWear to $100k in annual revenue within the first year.']
    },
  },
  {
    id: 'user-4',
    name: 'Ben Carter',
    avatarUrl: 'https://placehold.co/100x100.png',
    role: 'Investor',
    profile: {
      headline: 'Angel Investor | Ex-Founder',
      summary: 'Focused on SaaS and developer tools. I provide hands-on support to the founders I back.',
      experience: [
        {
          title: 'Founder',
          company: 'DevTools Co (Acquired)',
          duration: '2015 - 2020',
        },
      ],
      interests: ['SaaS', 'Developer Tools', 'API Economy'],
      investmentCriteria: 'Angel investments from $25k to $100k. Looking for strong technical teams.',
      pastSuccesses: ['First investor in API-First Inc (now valued at $50M)']
    },
  },
  {
    id: 'user-5',
    name: 'Jessica Wong',
    avatarUrl: 'https://placehold.co/100x100.png',
    role: 'Talent',
    profile: {
      headline: 'Product Marketing Lead | B2B SaaS',
      summary: 'Expert in go-to-market strategy, product positioning, and demand generation for B2B SaaS companies.',
      experience: [
        {
          title: 'Head of Marketing',
          company: 'SaaSy',
          duration: '2019 - Present',
        }
      ],
      interests: ['Marketing Automation', 'Content Strategy', 'Growth Hacking'],
      investmentCriteria: '',
      pastSuccesses: []
    },
  },
    {
    id: 'user-6',
    name: 'Michael Brown',
    avatarUrl: 'https://placehold.co/100x100.png',
    role: 'Founder',
    profile: {
      headline: 'Founder of QuantumLeap AI',
      summary: 'Developing next-generation AI models for scientific research. Raising a seed round to expand our research team.',
      experience: [
        {
          title: 'PhD Researcher',
          company: 'Tech University',
          duration: '2018 - 2022',
        },
      ],
      interests: ['Deep Learning', 'Quantum Computing', 'Scientific Research'],
      investmentCriteria: 'Seeking $1M seed funding for R&D and team expansion.',
      pastSuccesses: ['Published 5 papers in top AI conferences.']
    },
  },
];