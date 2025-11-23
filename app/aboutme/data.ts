export interface CareerEvent {
  id: string;
  title: string;
  role: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
  color: string; // Layer color
  type: 'work' | 'education' | 'project';
}

export const careerData: CareerEvent[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    role: 'Senior Frontend Engineer',
    company: 'Tech Corp',
    date: '2023 - Present',
    description: 'Leading the frontend team in building scalable web applications using Next.js and React. Implemented a new design system and improved site performance by 40%.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    color: '#EEA29A',
    type: 'work',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    role: 'Frontend Developer',
    company: 'Creative Agency',
    date: '2021 - 2023',
    description: 'Developed interactive websites for high-profile clients. Specialized in animations and micro-interactions using GSAP and Framer Motion.',
    skills: ['JavaScript', 'Vue.js', 'GSAP', 'SCSS', 'WebGL'],
    color: '#C94C4C',
    type: 'work',
  },
  {
    id: '3',
    title: 'Freelance Web Developer',
    role: 'Full Stack Developer',
    company: 'Self-Employed',
    date: '2019 - 2021',
    description: 'Worked with various startups to build MVPs and landing pages. Handled both frontend and backend development.',
    skills: ['React', 'Node.js', 'MongoDB', 'Firebase'],
    color: '#92A8D1',
    type: 'work',
  },
  {
    id: '4',
    title: 'Computer Science Degree',
    role: 'Student',
    company: 'University of Technology',
    date: '2015 - 2019',
    description: 'Bachelor of Science in Computer Science. Focus on Software Engineering and Human-Computer Interaction.',
    skills: ['Java', 'Python', 'Algorithms', 'Data Structures'],
    color: '#F7786B',
    type: 'education',
  },
];

export const profileData = {
  name: 'Ino',
  role: 'Creative Developer',
  location: 'Tokyo, Japan',
  stats: {
    experience: '5+ Years',
    projects: '50+',
    coffee: 'Infinite',
  }
};
