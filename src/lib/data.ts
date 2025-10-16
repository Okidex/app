
import { FullUserProfile, Startup, Job, InvestmentThesis, Conversation, Notification, Interest } from './types';
import { subMonths, format } from 'date-fns';
import { placeholderImages } from './placeholder-images';

function getImage(id: string) {
    return placeholderImages.find(img => img.id === id) || { imageUrl: `https://picsum.photos/seed/${id}/400/400`};
}

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
        },
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
            isSeekingCoFounder: false,
            about: "I'm a senior software engineer with a passion for building beautiful and functional user interfaces. I have extensive experience with the modern JavaScript ecosystem and enjoy working collaboratively to bring products to life.",
            organization: 'FlowState',
            education: 'B.S. in Computer Science from Yale University'
        },
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
            isSeekingCoFounder: true,
            about: "I build and scale products that users love. With a background in both engineering and business, I bring a holistic perspective to product development. I'm looking for a technical co-founder to join me on a new venture.",
            organization: 'Enigma Labs',
            education: 'MBA from Cambridge University'
        },
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
    },
];

export const startups: Startup[] = [
    {
        id: 'startup-1',
        companyName: 'InnovateAI',
        companyLogoUrl: getImage('logo-1').imageUrl,
        founderIds: ['user-1'],
        industry: 'Artificial Intelligence',
        stage: 'Seed',
        tagline: 'Bringing the power of AI to every business.',
        website: 'https://innovate.ai',
        description: 'InnovateAI is a platform that allows businesses to easily integrate artificial intelligence into their workflows. We provide pre-built models and a no-code interface, making AI accessible to non-technical users.',
        financials: {
            companyName: 'InnovateAI',
            revenue: 500000,
            expenses: 300000,
            netIncome: 200000,
            grossProfitMargin: 70,
            ebitda: 250000,
            customerAcquisitionCost: 500,
            customerLifetimeValue: 5000,
            monthlyRecurringRevenue: 42000,
            cashBurnRate: 8000,
            runway: 25,
        },
        monthlyFinancials: Array.from({ length: 6 }, (_, i) => {
            const date = subMonths(new Date(), i);
            const revenue = 42000 * (1 - i * 0.05);
            const expenses = 25000 * (1 - i * 0.02);
            return {
                month: format(date, 'yyyy-MM'),
                revenue: revenue,
                expenses: expenses,
                netIncome: revenue - expenses,
                monthlyRecurringRevenue: revenue,
            };
        }).reverse(),
        capTable: [
            { id: 'ct-1', shareholderName: 'Ada Lovelace', investment: 100000, shares: 500000, equityPercentage: 50, investmentStage: 'Pre-seed' },
            { id: 'ct-2', shareholderName: 'Difference Capital', investment: 500000, shares: 200000, equityPercentage: 20, investmentStage: 'Seed' },
            { id: 'ct-3', shareholderName: 'Employee Option Pool', investment: 0, shares: 300000, equityPercentage: 30, investmentStage: 'Seed' },
        ],
        incorporationDetails: {
            isIncorporated: true,
            country: 'USA',
            incorporationType: 'C-Corp',
            incorporationDate: '2023-01-15T00:00:00.000Z',
            entityNumber: '123456789',
            taxId: '98-7654321',
        },
    },
    {
        id: 'startup-2',
        companyName: 'WebWeave',
        companyLogoUrl: getImage('logo-2').imageUrl,
        founderIds: ['user-6'],
        industry: 'Decentralized Web',
        stage: 'Idea',
        tagline: 'Connecting the world, one link at a time.',
        website: 'https://webweave.io',
        description: 'WebWeave is building a new, decentralized protocol for a more open and interconnected internet. Our vision is to empower users and creators by giving them back control over their data and content.',
        financials: {
            companyName: 'WebWeave',
            revenue: 0,
            expenses: 5000,
            netIncome: -5000,
            grossProfitMargin: 0,
            ebitda: -5000,
            customerAcquisitionCost: 0,
            customerLifetimeValue: 0,
            monthlyRecurringRevenue: 0,
            cashBurnRate: 5000,
            runway: 12,
        },
        monthlyFinancials: [],
        capTable: [],
        incorporationDetails: {
            isIncorporated: false,
        },
    }
];

export const jobs: Job[] = [
    {
        id: 'job-1',
        title: 'Lead Frontend Engineer',
        companyName: 'InnovateAI',
        companyLogoUrl: getImage('logo-1').imageUrl,
        founderId: 'user-1',
        location: 'Remote',
        type: 'Full-time',
        description: 'We are looking for a talented Frontend Engineer to lead the development of our user-facing platform. You will be responsible for building a beautiful and intuitive interface that makes complex AI tools accessible to everyone.',
        postedAt: new Date().toISOString(),
    },
    {
        id: 'job-2',
        title: 'AI Research Scientist',
        companyName: 'InnovateAI',
        companyLogoUrl: getImage('logo-1').imageUrl,
        founderId: 'user-1',
        location: 'New York, NY',
        type: 'Full-time',
        description: 'Join our research team to work on cutting-edge AI models. You will have the opportunity to publish papers and contribute to the open-source community.',
        postedAt: subMonths(new Date(), 1).toISOString(),
    },
];

export const theses: InvestmentThesis[] = [
    {
        id: 'thesis-1',
        investorId: 'user-2',
        title: 'The Future of B2B SaaS is Vertical',
        industries: ['SaaS', 'B2B'],
        stages: ['Seed', 'Series A'],
        geographies: ['North America'],
        summary: 'I believe the next wave of billion-dollar SaaS companies will be vertical-specific, building deep, industry-specific workflows rather than horizontal tools. I am looking for founders who have unique insights into legacy industries and a clear vision for how to build a modern software stack to serve them.',
        postedAt: new Date().toISOString(),
        isAnonymous: false,
    },
    {
        id: 'thesis-2',
        investorId: 'user-5',
        title: 'Investing in the API Economy',
        industries: ['Developer Tools', 'API'],
        stages: ['Pre-seed', 'Seed'],
        geographies: ['Global'],
        summary: 'APIs are the building blocks of modern software. I am investing in companies that are building the next generation of API-first products and tools that enable developers to build faster and more securely.',
        postedAt: subMonths(new Date(), 2).toISOString(),
        isAnonymous: true,
    },
];

export const conversations: Conversation[] = [
    {
        id: 'convo-1',
        participantIds: ['user-1', 'user-2'],
        messages: [
            { id: 'msg-1', senderId: 'user-2', text: 'Hi Ada, I saw your profile and was very impressed with InnovateAI. I\'d love to learn more.', timestamp: subMonths(new Date(), 1).toISOString() },
            { id: 'msg-2', senderId: 'user-1', text: 'Thanks, Charles! I\'d be happy to chat. Are you free for a call next week?', timestamp: new Date().toISOString() },
        ],
    },
    {
        id: 'convo-2',
        participantIds: ['user-1', 'user-3'],
        messages: [
            { id: 'msg-3', senderId: 'user-1', text: 'Grace, your profile is a perfect fit for our Lead Frontend role. Would you be open to discussing it?', timestamp: new Date().toISOString() },
        ],
    },
];

export const notifications: Notification[] = [
    {
        id: 'notif-1',
        userId: 'user-1',
        type: 'message',
        text: 'Charles Babbage sent you a new message.',
        isRead: false,
        timestamp: new Date().toISOString(),
        link: '/messages',
        senderId: 'user-2',
    },
    {
        id: 'notif-2',
        userId: 'user-1',
        type: 'match',
        text: 'You have a new potential investor match: Hedy Lamarr.',
        isRead: false,
        timestamp: new Date().toISOString(),
        link: '/matches',
        senderId: 'user-5',
    },
     {
        id: 'notif-3',
        userId: 'user-2',
        type: 'applicant',
        text: 'Alan Turing expressed interest in your thesis "The Future of B2B SaaS is Vertical".',
        isRead: true,
        timestamp: subMonths(new Date(), 1).toISOString(),
        link: '/applicants',
        senderId: 'user-4',
    }
];

export const interests: Interest[] = [
    {
        id: 'interest-1',
        userId: 'user-4',
        targetId: 'thesis-1',
        targetType: 'thesis',
        timestamp: subMonths(new Date(), 1).toISOString(),
    },
     {
        id: 'interest-2',
        userId: 'user-3',
        targetId: 'job-1',
        targetType: 'job',
        timestamp: new Date().toISOString(),
    }
];
import { InvestmentStage } from './types';

export const investmentStages: InvestmentStage[] = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];
