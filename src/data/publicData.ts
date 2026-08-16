export interface Course {
  id: string;
  title: string;
  category: 'Computer Science' | 'Data Science' | 'Engineering' | 'Humanities' | 'Sciences';
  department: 'Engineering' | 'Sciences' | 'Humanities' | 'Computing';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  duration: string;
  image: string;
  isAiRecommended?: boolean;
  description: string;
  outcomes: string[];
  syllabus: { week: string; topic: string }[];
}

export const publicCoursesData: Course[] = [];
