import { Project, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'Seema Yadav',
  title: 'Aspiring Software Developer',
  secondaryTitle: 'Frontend Developer',
  education: 'B.Tech in Information Technology',
  institution: 'Ajay Kumar Garg Engineering College (AKGEC)',
  year: '3rd Year',
  location: 'India',
  currentFocus: 'Software Engineering, Modern Frontend, Problem Solving.',
  bio: 'I’m Seema Yadav, a B.Tech Information Technology student at AKGEC (3rd Year) and an aspiring software developer. I build clean, high-performance digital experiences and solve algorithmic problems with curiosity, discipline, and modern engineering standards.',
  avatar: '/seema-yadav.jpg',
  avatarFallback: 'https://avatars.githubusercontent.com/u/221518632?v=4',
  email: 'yadavseema0323@gmail.com',
  github: 'https://github.com/seema0323',
  linkedin: 'https://www.linkedin.com/in/seema-yadav-a55910358',
};

export const SELECTED_PROJECTS: Project[] = [
  {
    id: 'ai-personalized-learning',
    number: '01',
    title: 'AI-Powered Personalized Learning System',
    category: 'AI & Educational Tech',
    tagline: 'Adaptive learning pathways tailored to student pace and comprehension',
    description: 'An intelligent educational platform providing customized study modules, real-time feedback, and automated difficulty calibration for students.',
    longDescription: 'Engineered a student-centric learning environment leveraging adaptive algorithms to assess knowledge gaps, structure personalized learning curricula, and deliver dynamic quizzes that evolve with user comprehension. Designed with a sleek, accessible interface prioritizing clear progress visualization.',
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'AI Logic', 'REST APIs', 'Vercel'],
    liveUrl: 'https://ai-powered-personalized-learning-sy-three.vercel.app/',
    highlights: [
      'Dynamic curriculum pacing adapting to quiz outcomes',
      'Interactive study modules with immediate conceptual feedback',
      'Clean analytical dashboard displaying subject mastery'
    ],
    themeColor: '#06b6d4'
  },
  {
    id: 'student-dashboard',
    number: '02',
    title: 'Student Dashboard',
    category: 'Academic Management',
    tagline: 'Centralized command center for attendance, coursework, and schedules',
    description: 'A comprehensive web portal designed for students to track coursework, monitor academic performance indicators, and manage daily schedules efficiently.',
    longDescription: 'Created a modular academic portal integrating timetable schedules, subject-wise attendance analytics, assignment deadlines, and notification feeds. Emphasized high usability, quick key actions, and responsive layout across desktop and mobile screens.',
    technologies: ['React.js', 'JavaScript', 'CSS3', 'Component Architecture', 'Git'],
    githubUrl: 'https://github.com/seema0323/student-dashboard.git',
    highlights: [
      'Modular widget system for quick glance statistics',
      'Automated attendance threshold calculation and warnings',
      'Streamlined deadline management with visual urgency indicators'
    ],
    themeColor: '#8b5cf6'
  },
  {
    id: 'tripora',
    number: '03',
    title: 'Tripora',
    category: 'Travel & Exploration',
    tagline: 'Modern itinerary planner and destination discovery platform',
    description: 'An interactive travel web application helping explorers curate itineraries, discover scenic spots, and map out vacations seamlessly.',
    longDescription: 'Designed and deployed Tripora to simplify travel planning. Features visually rich destination showcases, interactive trip duration planners, route overviews, and responsive booking layouts designed for adventurers seeking frictionless trip curation.',
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS', 'Vercel Deployment', 'Figma'],
    liveUrl: 'https://tripora-ithgn1722-seema-s-projects4.vercel.app/',
    highlights: [
      'Curated destination explorer with immersive visual cards',
      'Custom travel itinerary builder and day-by-day planner',
      'Speed-optimized frontend with fluid transitions on Vercel'
    ],
    themeColor: '#10b981'
  },
  {
    id: 'hotel-booking-app',
    number: '04',
    title: 'Hotel Booking App',
    category: 'Hospitality & E-Commerce',
    tagline: 'Frictionless room reservation interface with real-time filtering',
    description: 'A full-featured hotel reservation frontend supporting dynamic room availability, amenity filtering, guest configuration, and checkout flows.',
    longDescription: 'Developed an intuitive hospitality booking web app providing users with immediate room comparisons, date-range selectors, price filtering, and comprehensive room details. Focused on conversion-oriented UI hierarchy and state-driven reservation forms.',
    technologies: ['React.js', 'JavaScript', 'CSS Modules', 'State Management', 'Git'],
    githubUrl: 'https://github.com/seema0323/hotel-booking-app.git',
    highlights: [
      'Interactive date picker and guest room capacity calculator',
      'Dynamic filter system for price range, rating, and amenities',
      'Step-by-step reservation validation with clean confirmation modal'
    ],
    themeColor: '#f59e0b'
  }
];

export const SKILL_GROUPS: SkillCategory[] = [
  {
    name: 'Frontend Engineering',
    color: '#06b6d4',
    skills: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5', 'CSS3']
  },
  {
    name: 'Languages & Problem Solving',
    color: '#8b5cf6',
    skills: ['C++', 'Java', 'Python (Basic)', 'Data Structures & Algorithms']
  },
  {
    name: 'Workflow & Tools',
    color: '#ec4899',
    skills: ['Git', 'GitHub', 'Figma', 'Vercel', 'Responsive UI']
  }
];

export const ACHIEVEMENT_ITEM = {
  title: 'KHO-KHO — STATE LEVEL',
  subtitle: 'Official State Level Competitor',
  description: 'Competed at the state level in Kho-Kho, representing disciplined athleticism, tactical agility, rapid decision-making under extreme pressure, and collaborative teamwork.',
  attributes: ['Tactical Agility', 'High-Pressure Decision Making', 'Team Coordination', 'Mental Endurance']
};
