import { FullUserProfile, Startup, Job, InvestmentThesis, Conversation, Notification, Interest, FounderObjective } from './types';
import { subMonths, format } from 'date-fns';
import { getImage } from './placeholder-images';

export const users: FullUserProfile[] = [
    {
        id: 'user-1',
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        role: 'founder',
        avatarUrl: getImage('user-1').imageUrl,
        profile: {
            companyId: 'startup-1',
            isLead: true,
            isPremium: true,
            title: 'CEO & Co-founder',
            objectives: ['fundraising', 'lookingToHire', 'networking'],
        },
        isLookingForCoFounder: false,
    },
    {
        id: 'user-2',
        name: 'Charles Babbage',
        email: 'charles@example.com',
        role: 'investor',
        avatarUrl: getImage('user-2').imageUrl,
        profile: {
            companyName: 'Difference Capital',
            companyUrl: 'https://example.com',
            investorType: 'GP',
            investmentInterests: ['AI', 'Fintech', 'SaaS'],
            investmentStages: ['Seed', 'Series A'],
            portfolio: [
                { companyName: 'InnovateAI', companyLogoUrl: getImage('logo-1').imageUrl, companyUrl: 'https://example.com' },
                { companyName: 'QuantumLeap', companyLogoUrl: getImage('logo-2').imageUrl, companyUrl: 'https://example.com' },
            ],
            exits: [
                 { companyName: 'DataDriven Inc.', companyUrl: 'https://example.com' }
            ],
            thesis: 'Investing in founders who are building the next generation of intelligent software.',
            about: "I'm a General Partner at Difference Capital, where I focus on early-stage investments in AI, Fintech, and B2B SaaS. I'm passionate about helping technical founders build category-defining companies. Previously, I was a product manager at a high-growth startup and have a background in computer science.",
            seeking: ['Board Seats', 'Mentoring Opportunities'],
        },
    },
    {
        id: 'user-3',
        name: 'Grace Hopper',
        email: 'grace@example.com',
        role: 'talent',
        avatarUrl: getImage('user-3').imageUrl,
        profile: {
            subRole: 'employee',
            headline: 'Senior Software Engineer',
            skills: ['React', 'Node.js', 'GraphQL', 'TypeScript'],
            experience: '5+ years of experience building scalable web applications. Passionate about creating intuitive user experiences and working in fast-paced startup environments. I thrive on solving complex problems and am always eager to learn new technologies. Looking for a challenging role where I can make a significant impact.',
            linkedin: 'https://www.linkedin.com/in/gracehopper',
            github: 'https://github.com/gracehopper',
            about: "I'm a senior software engineer with a passion for building beautiful and functional user interfaces. I have extensive experience with the modern JavaScript ecosystem and enjoy working collaboratively to bring products to life.",
            organization: 'FlowState',
            education: 'B.S. in Computer Science from Yale University'
        },
        isLookingForCoFounder: false,
    },
    {
        id: 'user-4',
        name: 'Alan Turing',
        email: 'alan@example.com',
        role: 'talent',
        avatarUrl: getImage('user-4').imageUrl,
        profile: {
            subRole: 'co-founder',
            headline: 'Product Leader & Strategist',
            skills: ['Product Management', 'Go-to-Market Strategy', 'User Research'],
            experience: 'Experienced product leader with a track record of launching and scaling B2B SaaS products. I excel at the intersection of technology, business, and user needs. Currently seeking a technical co-founder to build a new venture in the developer tools space. My ideal partner is passionate about building high-quality software and has deep expertise in backend systems or infrastructure.',
            linkedin: 'https://www.linkedin.com/in/alanturing',
            about: "I build and scale products that users love. With a background in both engineering and business, I bring a holistic perspective to product development. I'm looking for a technical co-founder to join me on a new venture.",
            organization: 'Enigma Labs',
            education: 'MBA from Cambridge University'
        },
        isLookingForCoFounder: true,
    },
     {
        id: 'user-5',
        name: 'Hedy Lamarr',
        email: 'hedy@example.com',
        role: 'investor',
        avatarUrl: getImage('user-5').imageUrl,
        profile: {
            companyName: 'Frequency Ventures',
            companyUrl: 'https://frequency.vc',
            investorType: 'LP',
            investmentInterests: ['Deep Tech', 'Telecommunications', 'Hardware'],
            investmentStages: ['Seed', 'Series A', 'Series B+'],
            portfolio: [
                { companyName: 'ConnectSphere', companyLogoUrl: getImage('logo-3').imageUrl, companyUrl: 'https://connectsphere.io' },
            ],
            exits: [],
            thesis: 'Investing in foundational technologies that will shape the future of communication and connectivity.',
            about: 'As a Limited Partner at Frequency Ventures, I support visionary founders who are tackling complex technical challenges. My background as an inventor and engineer gives me a unique perspective on deep tech opportunities.',
        },
    },
    {
        id: 'user-6',
        name: 'Tim Berners-Lee',
        email: 'tim@example.com',
        role: 'founder',
        avatarUrl: getImage('user-6').imageUrl,
        profile: {
            companyId: 'startup-2',
            isLead: true,
            title: 'Director',
            isPremium: false,
        },
        isLookingForCoFounder: false,
    },
    {
        id: 'user-7',
        name: 'Pepper Potts',
        email: 'pepper@example.com',
        role: 'talent',
        avatarUrl: getImage('user-7').imageUrl,
        profile: {
            subRole: 'fractional-leader',
            headline: 'Fractional COO & Operations Expert',
            skills: ['Operations', 'Strategy', 'Scaling', 'HR'],
            experience: 'Results-driven operations leader with a decade of experience scaling startups from seed to Series C. I specialize in building efficient systems, optimizing processes, and leading high-performing teams.',
            linkedin: 'https://www.linkedin.com/in/pepperpotts',
            github: '',
            about: "I'm a fractional COO dedicated to helping startups build a solid operational foundation for growth.",
            organization: 'Stark Industries',
            education: 'MBA from Harvard Business School'
        },
        isLookingForCoFounder: false,
    },
    {
        id: 'user-8',
        name: 'Mario Rossi',
        email: 'mario@example.com',
        role: 'founder',
        avatarUrl: getImage('user-8').imageUrl,
        profile: {
            companyId: 'startup-3',
            isLead: true,
            isPremium: true,
            title: 'Founder & CEO',
            objectives: ['lookingToHire', 'fundraising', 'networking'] as FounderObjective[],
        },
        isLookingForCoFounder: false,
    },
    {
        id: 'user-9',
        name: 'Landon Ricketts',
        email: 'landon@example.com',
        role: 'investor',
        avatarUrl: getImage('user-9').imageUrl,
        profile: {
            companyName: 'Frontier Investments',
            companyUrl: 'https://frontier.vc',
            investorType: 'Angel',
            investmentInterests: ['E-commerce', 'Logistics', 'Marketplaces'],
            investmentStages: ['Seed', 'Series A'],
            portfolio: [],
            exits: [],
            thesis: 'Backing ambitious founders building the future of commerce.',
            about: 'Early-stage investor and former operator. I love helping founders with product strategy and go-to-market.',
        },
    },
];

export const startups: Startup[] = [
    {
        id: 'startup-1',
        companyName: 'InnovateAI',
        companyLogoUrl: getImage('logo-1').imageUrl,
        founderIds: ['user-1'],
        industry: 'Artificial Intelligence',
        stage: 'Series A',
        tagline: 'The future of intelligent software',
        website: 'https://innovate.ai',
        description: 'InnovateAI is building the next generation of AI tools for enterprise efficiency.',
        location: 'London, UK',
        teamSize: '10-50',
        foundedDate: '2022'
    },
    {
        id: 'startup-2',
        companyName: 'WebFoundation',
        companyLogoUrl: getImage('logo-2').imageUrl,
        founderIds: ['user-6'],
        industry: 'Web Infrastructure',
        stage: 'Seed',
        tagline: 'Connecting the world',
        website: 'https://webfoundation.org',
        description: 'Building tools to ensure the web remains open and accessible to all.',
        location: 'Geneva, Switzerland',
        teamSize: '5-20',
        foundedDate: '1989'
    },
    {
        id: 'startup-3',
        companyName: 'PlumberTech',
        companyLogoUrl: getImage('logo-3').imageUrl,
        founderIds: ['user-8'],
        industry: 'Logistics',
        stage: 'Series B+',
        tagline: 'Reliable pipes for your data',
        website: 'https://plumbertech.com',
        description: 'Optimizing supply chain logistics through real-time tracking.',
        location: 'New York, USA',
        teamSize: '50-200',
        foundedDate: '2015'
    }
];

// MANDATORY EXPORTS FOR SEED SCRIPT
export const jobs: Job[] = [];
export const theses: InvestmentThesis[] = [];
export const conversations: Conversation[] = [];
export const notifications: Notification[] = [];
export const interests: Interest[] = [];
