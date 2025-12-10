/**
 * MOCK DATA: Courses
 * Realistic course data for UI development
 */

export interface MockCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // e.g., "6 weeks", "40 hours"
  rating: number;
  reviewCount: number;
  enrolled: number;
  price: number; // 0 for free
  tags: string[];
  modules: CourseModule[];
  language: string;
  lastUpdated: string;
  skills: string[];
  prerequisites?: string[];
  isEnrolled?: boolean;
  progress?: number; // 0-100
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string; // "45 min", "2 hours"
  lessons: CourseLesson[];
  quiz?: boolean;
  assignment?: boolean;
}

export interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'coding' | 'assignment';
  duration: string;
  completed?: boolean;
  videoUrl?: string;
  content?: string;
}

export const MOCK_COURSES: MockCourse[] = [
  {
    id: 'course-001',
    title: 'Complete React Developer Course 2024',
    description: 'Master React from basics to advanced concepts including Hooks, Context API, Redux, Next.js, and deployment. Build 12+ real-world projects.',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    category: 'Web Development',
    difficulty: 'intermediate',
    duration: '8 weeks',
    rating: 4.8,
    reviewCount: 2847,
    enrolled: 45230,
    price: 0,
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    language: 'English',
    lastUpdated: '2024-11-20',
    skills: ['React', 'Hooks', 'Redux', 'Next.js', 'TypeScript'],
    prerequisites: ['Basic JavaScript', 'HTML & CSS'],
    isEnrolled: true,
    progress: 45,
    modules: [
      {
        id: 'mod-001',
        title: 'React Fundamentals',
        description: 'Learn the core concepts of React including components, props, and state',
        duration: '6 hours',
        lessons: [
          { id: 'lesson-001', title: 'Introduction to React', type: 'video', duration: '15 min', completed: true },
          { id: 'lesson-002', title: 'Components & Props', type: 'video', duration: '25 min', completed: true },
          { id: 'lesson-003', title: 'State Management', type: 'video', duration: '30 min', completed: false },
        ],
        quiz: true,
      },
      {
        id: 'mod-002',
        title: 'Advanced React Patterns',
        description: 'Master advanced patterns including Hooks, Context, and custom hooks',
        duration: '8 hours',
        lessons: [
          { id: 'lesson-004', title: 'React Hooks Deep Dive', type: 'video', duration: '40 min', completed: false },
          { id: 'lesson-005', title: 'Context API', type: 'video', duration: '35 min', completed: false },
        ],
        quiz: true,
        assignment: true,
      },
    ],
  },
  {
    id: 'course-002',
    title: 'Python for Data Science & Machine Learning',
    description: 'Complete Python course covering NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, and real ML projects.',
    instructor: 'Dr. Rahul Mehta',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    category: 'Data Science',
    difficulty: 'intermediate',
    duration: '10 weeks',
    rating: 4.9,
    reviewCount: 5621,
    enrolled: 78450,
    price: 0,
    tags: ['Python', 'Machine Learning', 'Data Science', 'AI'],
    language: 'English',
    lastUpdated: '2024-12-01',
    skills: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    prerequisites: ['Basic Programming'],
    isEnrolled: true,
    progress: 20,
    modules: [
      {
        id: 'mod-003',
        title: 'Python Essentials',
        description: 'Core Python programming concepts',
        duration: '5 hours',
        lessons: [
          { id: 'lesson-006', title: 'Python Basics', type: 'video', duration: '20 min', completed: true },
        ],
        quiz: true,
      },
    ],
  },
  {
    id: 'course-003',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, Node.js, Express, MongoDB, and React. Build and deploy full-stack applications.',
    instructor: 'Michael Chen',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    category: 'Web Development',
    difficulty: 'beginner',
    duration: '12 weeks',
    rating: 4.7,
    reviewCount: 3921,
    enrolled: 52100,
    price: 0,
    tags: ['Full Stack', 'MERN', 'JavaScript', 'Node.js'],
    language: 'English',
    lastUpdated: '2024-11-15',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    isEnrolled: false,
    modules: [],
  },
  {
    id: 'course-004',
    title: 'UI/UX Design Masterclass',
    description: 'Master user interface and user experience design using Figma. Learn design thinking, wireframing, prototyping, and user research.',
    instructor: 'Emma Wilson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    category: 'Design',
    difficulty: 'beginner',
    duration: '6 weeks',
    rating: 4.9,
    reviewCount: 1834,
    enrolled: 28900,
    price: 0,
    tags: ['UI/UX', 'Figma', 'Design', 'Prototyping'],
    language: 'English',
    lastUpdated: '2024-11-28',
    skills: ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping'],
    isEnrolled: true,
    progress: 60,
    modules: [],
  },
  {
    id: 'course-005',
    title: 'DevOps & Cloud Computing with AWS',
    description: 'Learn DevOps practices, CI/CD pipelines, Docker, Kubernetes, and AWS cloud services. Deploy scalable applications.',
    instructor: 'James Anderson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    category: 'DevOps',
    difficulty: 'advanced',
    duration: '10 weeks',
    rating: 4.6,
    reviewCount: 1245,
    enrolled: 15670,
    price: 0,
    tags: ['DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    language: 'English',
    lastUpdated: '2024-12-05',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    prerequisites: ['Linux Basics', 'Git', 'Cloud Fundamentals'],
    isEnrolled: false,
    modules: [],
  },
  {
    id: 'course-006',
    title: 'Cybersecurity Fundamentals',
    description: 'Introduction to cybersecurity concepts, network security, cryptography, ethical hacking, and security best practices.',
    instructor: 'Dr. Lisa Kumar',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    category: 'Security',
    difficulty: 'beginner',
    duration: '8 weeks',
    rating: 4.8,
    reviewCount: 987,
    enrolled: 12340,
    price: 0,
    tags: ['Cybersecurity', 'Ethical Hacking', 'Network Security'],
    language: 'English',
    lastUpdated: '2024-11-10',
    skills: ['Network Security', 'Cryptography', 'Penetration Testing', 'Security Tools'],
    isEnrolled: false,
    modules: [],
  },
];

export const getMockCourse = (id: string): MockCourse | undefined => {
  return MOCK_COURSES.find(course => course.id === id);
};

export const getMockEnrolledCourses = (): MockCourse[] => {
  return MOCK_COURSES.filter(course => course.isEnrolled);
};

export const getMockCoursesByCategory = (category: string): MockCourse[] => {
  return MOCK_COURSES.filter(course => course.category === category);
};

export const getMockCoursesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): MockCourse[] => {
  return MOCK_COURSES.filter(course => course.difficulty === difficulty);
};
