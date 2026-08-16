import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import {
  User,
  Course,
  TeacherClass,
  StudentAssignment,
  TeacherSubmission,
  SubjectAttendance,
  TeacherAttendanceRecord,
  StudentExam,
  StudentGradeRecord,
  TeacherGradeEntry,
  ScheduleItem,
  AIRecommendation,
  WeakTopic,
  SystemMonitoringLog,
  SystemHealthItem,
  AtRiskStudent,
  AdminTeacher
} from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export interface DatabaseSchema {
  users: User[];
  courses: Course[];
  classes: TeacherClass[];
  assignments: StudentAssignment[];
  submissions: TeacherSubmission[];
  attendance: SubjectAttendance[];
  teacherAttendanceRecords: TeacherAttendanceRecord[];
  exams: StudentExam[];
  grades: StudentGradeRecord[];
  teacherGrades: TeacherGradeEntry[];
  schedules: ScheduleItem[];
  aiRecommendations: AIRecommendation[];
  weakTopics: WeakTopic[];
  systemLogs: SystemMonitoringLog[];
  systemHealth: SystemHealthItem[];
  students: AtRiskStudent[];
  teachers: AdminTeacher[];
}

// Initial Seed Data
const getInitialSeedData = (): DatabaseSchema => {
  const defaultPasswordHash = bcrypt.hashSync('password123', 10);

  return {
    users: [
      {
        id: 'std_01',
        name: 'Alex Rivera',
        email: 'alex.rivera@eduai.edu',
        password: defaultPasswordHash,
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'Computer Science Undergraduate',
        department: 'School of Computing',
        studentId: 'EDU-8842',
        semester: 'Fall Semester 2024 (Term 5)',
        phone: '+1 (555) 234-5678',
        createdAt: '2024-08-01T00:00:00Z'
      },
      {
        id: 'std_02',
        name: 'Emma Stone',
        email: 'emma.stone@eduai.edu',
        password: defaultPasswordHash,
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        title: 'Mathematics Major',
        department: 'Applied Mathematics',
        studentId: 'EDU-8843',
        semester: 'Fall Semester 2024 (Term 5)',
        phone: '+1 (555) 345-6789',
        createdAt: '2024-08-01T00:00:00Z'
      },
      {
        id: 'tch_01',
        name: 'Prof. Henderson',
        email: 'henderson@eduai.edu',
        password: defaultPasswordHash,
        role: 'teacher',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        title: 'Senior Mathematics & CS Professor',
        department: 'Department of Applied Mathematics',
        employeeId: 'TCH-402',
        designation: 'Senior Faculty Professor',
        officeRoom: 'Science Building - Room 402B',
        phone: '+1 (555) 876-5432',
        createdAt: '2023-01-15T00:00:00Z'
      },
      {
        id: 'tch_02',
        name: 'Dr. Alan Turing',
        email: 'turing@eduai.edu',
        password: defaultPasswordHash,
        role: 'teacher',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        title: 'Department Chair & Professor',
        department: 'School of Computing',
        employeeId: 'TCH-101',
        designation: 'Department Chair',
        officeRoom: 'Turing Hall - Room 101',
        phone: '+1 (555) 123-4567',
        createdAt: '2022-06-01T00:00:00Z'
      },
      {
        id: 'adm_01',
        name: 'Dr. Sarah Jenkins',
        email: 's.jenkins@eduai.edu',
        password: defaultPasswordHash,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        title: 'Super Admin & Dean of Academics',
        department: 'Institutional Administration',
        employeeId: 'ADM-001',
        phone: '+1 (555) 987-6543',
        createdAt: '2021-09-01T00:00:00Z'
      }
    ],

    courses: [
      {
        id: 'MATH-101',
        name: 'Mathematics (Calculus & Linear Algebra)',
        title: 'Mathematics (Calculus & Linear Algebra)',
        code: 'MATH-101',
        category: 'Mathematics',
        department: 'Applied Mathematics',
        difficulty: 'Intermediate',
        instructor: 'Prof. Henderson',
        instructorId: 'tch_01',
        rating: 4.8,
        reviewsCount: 310,
        enrolledCount: 148,
        duration: '14 Weeks',
        schedule: 'Tue/Thu 10:00 AM',
        studentCount: 48,
        avgGrade: 'A-',
        credits: 4,
        status: 'Active',
        description: 'Comprehensive calculus covering limits, multivariate derivatives, multiple integrals, vector calculus, and core linear algebra matrices.',
        outcomes: [
          'Master differential and integral multivariable calculus',
          'Solve matrix transformations and eigenvalues/eigenvectors',
          'Apply numerical mathematical methods in scientific computing'
        ],
        syllabus: [
          { week: 'Week 1-3', topic: 'Limits, Continuity & Multivariate Derivatives' },
          { week: 'Week 4-7', topic: 'Multiple Integrals & Vector Calculus' },
          { week: 'Week 8-11', topic: 'Matrix Transformations & Vector Spaces' },
          { week: 'Week 12-14', topic: 'Eigenvalues, Orthogonality & Spectral Theorems' }
        ]
      },
      {
        id: 'CS-201',
        name: 'Data Structures & Algorithms',
        title: 'Data Structures & Algorithms',
        code: 'CS-201',
        category: 'Computer Science',
        department: 'School of Computing',
        difficulty: 'Intermediate',
        instructor: 'Dr. Alan Turing',
        instructorId: 'tch_02',
        rating: 4.9,
        reviewsCount: 520,
        enrolledCount: 180,
        duration: '12 Weeks',
        schedule: 'Mon/Wed 1:00 PM',
        studentCount: 52,
        avgGrade: 'B+',
        credits: 4,
        status: 'Active',
        description: 'Core fundamentals of data organization, algorithmic complexity (Big O), trees, graphs, dynamic programming, and search/sort optimization.',
        outcomes: [
          'Design efficient custom data structures for complex problems',
          'Analyze worst-case and amortized time/space complexity',
          'Implement graph traversals, Dijkstra, and DP memoization'
        ],
        syllabus: [
          { week: 'Week 1-2', topic: 'Algorithmic Complexity & Linear Structures' },
          { week: 'Week 3-5', topic: 'Binary Search Trees, AVL & Red-Black Trees' },
          { week: 'Week 6-8', topic: 'Heaps, Hash Maps & Priority Queues' },
          { week: 'Week 9-12', topic: 'Graph Algorithms & Dynamic Programming' }
        ]
      },
      {
        id: 'CS-303',
        name: 'Database Systems & SQL',
        title: 'Database Systems & SQL',
        code: 'CS-303',
        category: 'Computer Science',
        department: 'School of Computing',
        difficulty: 'Intermediate',
        instructor: 'Prof. Marcus Vance',
        instructorId: 'tch_04',
        rating: 4.7,
        reviewsCount: 410,
        enrolledCount: 165,
        duration: '10 Weeks',
        schedule: 'Wed 3:00 PM',
        studentCount: 65,
        avgGrade: 'C+',
        credits: 4,
        status: 'Active',
        description: 'Relational model, SQL optimization, normalization (3NF/BCNF), indexing, transactions ACID properties, and NoSQL architecture.',
        outcomes: [
          'Write optimized relational queries and complex joins',
          'Design normalized schemas up to BCNF',
          'Implement ACID transactions with isolation levels'
        ],
        syllabus: [
          { week: 'Week 1-2', topic: 'Entity-Relationship Modeling & Relational Schema' },
          { week: 'Week 3-4', topic: 'Advanced SQL, Views, and Triggers' },
          { week: 'Week 5-7', topic: 'Functional Dependencies & Normalization (3NF/BCNF)' },
          { week: 'Week 8-10', topic: 'Indexing, Query Optimization & Transaction Management' }
        ]
      },
      {
        id: 'CS-405',
        name: 'AI & Machine Learning Foundations',
        title: 'AI & Machine Learning Foundations',
        code: 'CS-405',
        category: 'Computer Science',
        department: 'School of Computing',
        difficulty: 'Advanced',
        instructor: 'Dr. Sarah Jenkins',
        instructorId: 'adm_01',
        rating: 4.95,
        reviewsCount: 890,
        enrolledCount: 210,
        duration: '12 Weeks',
        schedule: 'Mon/Thu 11:00 AM',
        studentCount: 70,
        avgGrade: 'A',
        credits: 4,
        status: 'Active',
        description: 'Foundations of artificial intelligence, search algorithms, supervised/unsupervised machine learning, and deep neural networks using PyTorch.',
        outcomes: [
          'Implement foundational ML algorithms from scratch',
          'Train neural networks using PyTorch and evaluate performance',
          'Address ethical considerations and model interpretability'
        ],
        syllabus: [
          { week: 'Week 1-3', topic: 'Search Algorithms, Heuristics & Game Trees' },
          { week: 'Week 4-6', topic: 'Supervised Learning: Regression & Classification' },
          { week: 'Week 7-9', topic: 'Unsupervised Learning, Clustering & Dimensionality Reduction' },
          { week: 'Week 10-12', topic: 'Deep Learning, CNNs & Transformer Architectures' }
        ]
      },
      {
        id: 'MATH-401',
        name: 'Advanced Calculus',
        title: 'Advanced Calculus',
        code: 'MATH-401',
        category: 'Mathematics',
        department: 'Applied Mathematics',
        difficulty: 'Advanced',
        instructor: 'Prof. Henderson',
        instructorId: 'tch_01',
        rating: 4.85,
        reviewsCount: 190,
        enrolledCount: 85,
        duration: '14 Weeks',
        schedule: 'Tue/Thu 10:00 AM',
        studentCount: 48,
        avgGrade: 'B+',
        credits: 4,
        status: 'Active',
        description: 'Rigorous analysis of real functions, metric spaces, sequences, series, uniform convergence, and Lebesgue integration.'
      }
    ],

    classes: [
      {
        id: 'cls_1',
        courseName: 'Advanced Calculus',
        courseCode: 'MATH-401',
        section: 'Sec A01',
        studentCount: 24,
        room: 'Hall B - Room 302',
        schedule: 'Tue/Thu 10:00 AM',
        status: 'Active',
        avgPerformance: 84,
        attendanceRate: 94,
        instructor: 'Prof. Henderson',
        capacity: 30
      },
      {
        id: 'cls_2',
        courseName: 'Advanced Calculus',
        courseCode: 'MATH-401',
        section: 'Sec A02',
        studentCount: 24,
        room: 'Hall B - Room 304',
        schedule: 'Tue/Thu 2:00 PM',
        status: 'Active',
        avgPerformance: 79,
        attendanceRate: 91,
        instructor: 'Prof. Henderson',
        capacity: 30
      },
      {
        id: 'cls_3',
        courseName: 'Linear Algebra',
        courseCode: 'MATH-302',
        section: 'Sec B01',
        studentCount: 35,
        room: 'Lab 4',
        schedule: 'Mon/Wed 1:00 PM',
        status: 'Active',
        avgPerformance: 88,
        attendanceRate: 96,
        instructor: 'Prof. Henderson',
        capacity: 40
      },
      {
        id: 'cls_4',
        courseName: 'Discrete Mathematics',
        courseCode: 'MATH-205',
        section: 'Sec C01',
        studentCount: 41,
        room: 'Hall A - Room 104',
        schedule: 'Fri 9:00 AM',
        status: 'Active',
        avgPerformance: 76,
        attendanceRate: 89,
        instructor: 'Dr. Alan Turing',
        capacity: 45
      }
    ],

    assignments: [
      {
        id: 'asg_1',
        title: 'Relational Database Normalization Project',
        course: 'Database Systems',
        courseCode: 'CS-303',
        dueDate: 'Oct 25, 2024',
        status: 'Pending',
        description: 'Design a 3NF relational schema for a multi-tenant hospital management system.',
        instructions: 'Submit your ER diagram, schema relational table definitions, and SQL DDL scripts.',
        teacher: 'Prof. Marcus Vance',
        submissionsCount: 42,
        maxScore: 100,
        studentId: 'std_01'
      },
      {
        id: 'asg_2',
        title: 'Neural Network Classifier Implementation',
        course: 'AI & Machine Learning',
        courseCode: 'CS-405',
        dueDate: 'Tomorrow (11:59 PM)',
        status: 'Pending',
        description: 'Build and train a PyTorch multi-layer perceptron on the MNIST digit dataset.',
        instructions: 'Achieve >95% validation accuracy. Provide training loss and confusion matrix plots.',
        teacher: 'Dr. Sarah Jenkins',
        submissionsCount: 88,
        maxScore: 100,
        studentId: 'std_01'
      },
      {
        id: 'asg_3',
        title: 'Differential Equations Problem Set #3',
        course: 'Mathematics',
        courseCode: 'MATH-101',
        dueDate: 'Oct 15, 2024',
        status: 'Evaluated',
        score: '92/100',
        description: 'Second-order linear homogeneous differential equations with constant coefficients.',
        instructions: 'Show all analytical derivation steps and verify using Laplace transforms.',
        teacher: 'Prof. Henderson',
        teacherFeedback: 'Excellent analytical derivations and clear Laplace transform solutions.',
        aiFeedback: 'Strong mastery demonstrated in solving second-order homogenous differential equations.',
        submissionsCount: 48,
        maxScore: 100,
        studentId: 'std_01'
      },
      {
        id: 'asg_4',
        title: 'Calculus Optimization Problem Set',
        course: 'Advanced Calculus',
        courseCode: 'MATH-401',
        dueDate: 'Oct 22, 2024',
        status: 'Evaluated',
        score: '92/100',
        description: 'Lagrange multipliers and constrained optimization problems.',
        teacher: 'Prof. Henderson',
        submissionsCount: 48,
        maxScore: 100
      }
    ],

    submissions: [
      {
        id: 'sub_1',
        assignmentId: 'asg_4',
        studentName: 'Emma Stone',
        studentId: 'EDU-8843',
        assignmentTitle: 'Calculus Optimization Problem Set',
        submittedDate: 'Oct 22, 2024',
        maxScore: 100,
        status: 'Pending Grade',
        submissionContent: 'Here is the step-by-step proof utilizing Lagrange multipliers for the elliptical boundary constraints.'
      },
      {
        id: 'sub_2',
        assignmentId: 'asg_4',
        studentName: 'Alex Rivera',
        studentId: 'EDU-8842',
        assignmentTitle: 'Calculus Optimization Problem Set',
        submittedDate: 'Oct 21, 2024',
        score: 92,
        maxScore: 100,
        status: 'Graded',
        teacherFeedback: 'Flawless execution on the gradient vectors and critical points.',
        aiFeedback: 'Accurate application of Hessian matrix test for local extrema.'
      },
      {
        id: 'sub_3',
        assignmentId: 'asg_1',
        studentName: 'James Wilson',
        studentId: 'EDU-8844',
        assignmentTitle: 'Relational Database Normalization Project',
        submittedDate: 'Oct 24, 2024',
        maxScore: 100,
        status: 'Pending Grade',
        submissionContent: 'Attached the ER diagram and normalization steps from 1NF to BCNF.'
      }
    ],

    attendance: [
      {
        id: 'att_1',
        studentId: 'std_01',
        subject: 'Mathematics (MATH-101)',
        code: 'MATH-101',
        classesHeld: 30,
        present: 28,
        absent: 1,
        late: 1,
        percentage: 94,
        status: 'Excellent'
      },
      {
        id: 'att_2',
        studentId: 'std_01',
        subject: 'Data Structures (CS-201)',
        code: 'CS-201',
        classesHeld: 28,
        present: 26,
        absent: 1,
        late: 1,
        percentage: 93,
        status: 'Excellent'
      },
      {
        id: 'att_3',
        studentId: 'std_01',
        subject: 'Database Systems (CS-303)',
        code: 'CS-303',
        classesHeld: 26,
        present: 21,
        absent: 3,
        late: 2,
        percentage: 81,
        status: 'Good'
      },
      {
        id: 'att_4',
        studentId: 'std_01',
        subject: 'AI & Machine Learning (CS-405)',
        code: 'CS-405',
        classesHeld: 24,
        present: 23,
        absent: 0,
        late: 1,
        percentage: 96,
        status: 'Excellent'
      }
    ],

    teacherAttendanceRecords: [
      { studentId: 'EDU-8842', studentName: 'Alex Rivera', courseCode: 'MATH-401', section: 'Sec A01', status: 'Present', attendancePercentage: 91 },
      { studentId: 'EDU-8843', studentName: 'Emma Stone', courseCode: 'MATH-401', section: 'Sec A01', status: 'Absent', attendancePercentage: 68 },
      { studentId: 'EDU-8844', studentName: 'James Wilson', courseCode: 'MATH-401', section: 'Sec A01', status: 'Absent', attendancePercentage: 72 },
      { studentId: 'EDU-8845', studentName: 'Mia Patel', courseCode: 'MATH-401', section: 'Sec A01', status: 'Late', attendancePercentage: 81 },
      { studentId: 'EDU-8846', studentName: 'Lucas Zhang', courseCode: 'MATH-401', section: 'Sec A01', status: 'Present', attendancePercentage: 96 },
      { studentId: 'EDU-8847', studentName: 'Sophia Miller', courseCode: 'MATH-401', section: 'Sec A01', status: 'Present', attendancePercentage: 94 }
    ],

    exams: [
      {
        id: 'ex_1',
        title: 'Mathematics Midterm Exam',
        subject: 'Mathematics (MATH-101)',
        date: 'Oct 28, 2024',
        time: '9:00 AM',
        duration: '2 Hours',
        location: 'Hall B - Room 302',
        isUpcoming: true,
        instructor: 'Prof. Henderson',
        studentsCount: 48,
        maxMarks: 100,
        instructions: ['Calculators permitted', 'No formula sheets allowed', 'Bring student ID card']
      },
      {
        id: 'ex_2',
        title: 'Data Structures Practicum',
        subject: 'Data Structures (CS-201)',
        date: 'Nov 04, 2024',
        time: '1:00 PM',
        duration: '2 Hours',
        location: 'Computer Lab 4',
        isUpcoming: true,
        instructor: 'Dr. Alan Turing',
        studentsCount: 35,
        maxMarks: 100,
        instructions: ['Coding exam in IDE environment', 'Internet access restricted']
      },
      {
        id: 'ex_3',
        title: 'Database Systems Final Exam',
        subject: 'Database Systems (CS-303)',
        date: 'Dec 12, 2024',
        time: '10:00 AM',
        duration: '3 Hours',
        location: 'Auditorium 1',
        isUpcoming: true,
        instructor: 'Prof. Marcus Vance',
        studentsCount: 65,
        maxMarks: 100
      }
    ],

    grades: [
      {
        id: 'gr_1',
        studentId: 'std_01',
        studentName: 'Alex Rivera',
        subject: 'Mathematics',
        code: 'MATH-101',
        assessment: 'Midterm Exam',
        score: 92,
        maxScore: 100,
        grade: 'A',
        status: 'Pass',
        semester: 'Fall 2024',
        department: 'Applied Mathematics'
      },
      {
        id: 'gr_2',
        studentId: 'std_01',
        studentName: 'Alex Rivera',
        subject: 'Data Structures',
        code: 'CS-201',
        assessment: 'Midterm Exam',
        score: 84,
        maxScore: 100,
        grade: 'B+',
        status: 'Pass',
        semester: 'Fall 2024',
        department: 'School of Computing'
      },
      {
        id: 'gr_3',
        studentId: 'std_01',
        studentName: 'Alex Rivera',
        subject: 'Database Systems',
        code: 'CS-303',
        assessment: 'Midterm Exam',
        score: 64,
        maxScore: 100,
        grade: 'C',
        status: 'Pass',
        semester: 'Fall 2024',
        department: 'School of Computing'
      },
      {
        id: 'gr_4',
        studentId: 'std_02',
        studentName: 'Emma Stone',
        subject: 'Mathematics',
        code: 'MATH-101',
        assessment: 'Midterm Exam',
        score: 60,
        maxScore: 100,
        grade: 'D',
        status: 'Pass',
        semester: 'Fall 2024',
        department: 'Applied Mathematics'
      }
    ],

    teacherGrades: [
      {
        id: 'g_1',
        studentName: 'Alex Rivera',
        studentId: 'EDU-8842',
        courseCode: 'MATH-401',
        assignmentScore: 92,
        examScore: 88,
        totalScore: 90,
        grade: 'A-',
        status: 'Pass'
      },
      {
        id: 'g_2',
        studentName: 'Emma Stone',
        studentId: 'EDU-8843',
        courseCode: 'MATH-401',
        assignmentScore: 58,
        examScore: 62,
        totalScore: 60,
        grade: 'C-',
        status: 'Pass'
      },
      {
        id: 'g_3',
        studentName: 'James Wilson',
        studentId: 'EDU-8844',
        courseCode: 'MATH-401',
        assignmentScore: 65,
        examScore: 68,
        totalScore: 66,
        grade: 'C',
        status: 'Pass'
      },
      {
        id: 'g_4',
        studentName: 'Mia Patel',
        studentId: 'EDU-8845',
        courseCode: 'MATH-401',
        assignmentScore: 78,
        examScore: 80,
        totalScore: 79,
        grade: 'B',
        status: 'Pass'
      },
      {
        id: 'g_5',
        studentName: 'Lucas Zhang',
        studentId: 'EDU-8846',
        courseCode: 'MATH-401',
        assignmentScore: 96,
        examScore: 94,
        totalScore: 95,
        grade: 'A',
        status: 'Pass'
      },
      {
        id: 'g_6',
        studentName: 'Sophia Miller',
        studentId: 'EDU-8847',
        courseCode: 'MATH-401',
        assignmentScore: 89,
        examScore: 91,
        totalScore: 90,
        grade: 'A-',
        status: 'Pass'
      }
    ],

    schedules: [
      {
        id: 'sch_1',
        studentId: 'std_01',
        day: 'Monday',
        time: '9:00 AM - 10:30 AM',
        subject: 'Mathematics (MATH-101)',
        code: 'MATH-101',
        instructor: 'Prof. Henderson',
        room: 'Hall B - 302',
        isUpcoming: true
      },
      {
        id: 'sch_2',
        studentId: 'std_01',
        day: 'Monday',
        time: '11:00 AM - 12:30 PM',
        subject: 'AI & Machine Learning (CS-405)',
        code: 'CS-405',
        instructor: 'Dr. Sarah Jenkins',
        room: 'Lab 2',
        isUpcoming: true
      },
      {
        id: 'sch_3',
        studentId: 'std_01',
        day: 'Tuesday',
        time: '2:00 PM - 3:30 PM',
        subject: 'Data Structures (CS-201)',
        code: 'CS-201',
        instructor: 'Dr. Alan Turing',
        room: 'Lab 4',
        isUpcoming: true
      },
      {
        id: 'sch_4',
        studentId: 'std_01',
        day: 'Wednesday',
        time: '10:00 AM - 11:30 AM',
        subject: 'Database Systems (CS-303)',
        code: 'CS-303',
        instructor: 'Prof. Marcus Vance',
        room: 'Hall A - 104'
      },
      {
        id: 'sch_5',
        studentId: 'std_01',
        day: 'Thursday',
        time: '2:00 PM - 3:30 PM',
        subject: 'Data Structures (CS-201)',
        code: 'CS-201',
        instructor: 'Dr. Alan Turing',
        room: 'Lab 4'
      },
      {
        id: 'sch_6',
        studentId: 'std_01',
        day: 'Friday',
        time: '1:00 PM - 2:30 PM',
        subject: 'AI & ML Lab Tutorial',
        code: 'CS-405L',
        instructor: 'Teaching Asst. Chen',
        room: 'Lab 1'
      }
    ],

    aiRecommendations: [
      {
        id: 'ai_1',
        studentId: 'std_01',
        targetSubject: 'Database Systems (CS-303)',
        scoreChange: '-12%',
        riskLevel: 'Medium',
        priority: 'High',
        insightText: 'Your recent assignment scores have declined by 12% in Database Systems while attendance remains stable at 81%.',
        reason: 'Struggles detected in relational normalization (3NF/BCNF) and SQL subquery optimizations.',
        suggestedAction: 'Complete Practice Exercise #4 on SQL Joins and review Module 3 lecture slides.',
        recommendations: [
          'Revise 3NF and Boyce-Codd Normal Form rules.',
          'Practice INNER JOIN vs LEFT OUTER JOIN query patterns.',
          'Schedule tutorial session with Prof. Marcus Vance.'
        ],
        actionText: 'Start SQL Practice'
      },
      {
        id: 'ai_2',
        studentId: 'std_01',
        targetSubject: 'Mathematics (MATH-101)',
        scoreChange: '+6%',
        riskLevel: 'Low',
        priority: 'Medium',
        insightText: 'Strong performance trend in Calculus with 94% attendance and 92/100 score on latest Problem Set.',
        reason: 'High problem set completion rate and solid understanding of differential equations.',
        suggestedAction: 'Maintain current study rhythm before Midterm Exam on Oct 28.',
        recommendations: [
          'Review integration by parts sample problems.',
          'Attempt mock midterm exam #1 under timed conditions.'
        ],
        actionText: 'Take Practice Test'
      }
    ],

    weakTopics: [
      {
        id: 'wt_1',
        topic: 'Advanced Integration by Parts (Module 4)',
        course: 'MATH-401',
        studentsAffectedPercentage: 42,
        severity: 'High',
        recommendedAction: 'Schedule a 45-minute revision workshop on Thursday.'
      },
      {
        id: 'wt_2',
        topic: 'Relational Normalization 3NF & BCNF',
        course: 'CS-303',
        studentsAffectedPercentage: 38,
        severity: 'High',
        recommendedAction: 'Assign supplementary interactive normalization exercises.'
      },
      {
        id: 'wt_3',
        topic: 'Graph Dijkstra & Topological Sort',
        course: 'CS-201',
        studentsAffectedPercentage: 24,
        severity: 'Medium',
        recommendedAction: 'Provide step-by-step visual trace animations during lecture.'
      }
    ],

    systemLogs: [
      {
        id: 'log_1',
        title: 'LMS Data Sync Completed',
        time: '10 mins ago',
        source: 'System Auto',
        type: 'sync',
        userRole: 'System',
        action: 'Data Sync',
        module: 'Database',
        status: 'Success'
      },
      {
        id: 'log_2',
        title: 'New Security Patch Deployed',
        time: '1 hour ago',
        source: 'IT Ops',
        type: 'security',
        userRole: 'Admin',
        action: 'Security Update',
        module: 'Auth',
        status: 'Success'
      },
      {
        id: 'log_3',
        title: 'Batch User Import (240)',
        time: '3 hours ago',
        source: 'Admin Portal',
        type: 'user',
        userRole: 'Admin',
        action: 'User Import',
        module: 'Students',
        status: 'Success'
      },
      {
        id: 'log_4',
        title: 'API Rate Limit Warning',
        time: 'Yesterday',
        source: 'External Integration',
        type: 'warning',
        userRole: 'System',
        action: 'Rate Limit',
        module: 'API',
        status: 'Warning'
      }
    ],

    systemHealth: [
      { name: 'Core API Gateway', status: 'Operational', uptime: '99.98%', latency: '24ms' },
      { name: 'Database Engine Cluster', status: 'Operational', uptime: '99.95%', latency: '8ms' },
      { name: 'JWT Authentication Service', status: 'Operational', uptime: '100.0%', latency: '15ms' },
      { name: 'AI Recommendation Inference Engine', status: 'Operational', uptime: '99.90%', latency: '42ms' },
      { name: 'LMS Storage & Media Service', status: 'Operational', uptime: '99.99%', latency: '18ms' }
    ],

    students: [
      { id: 'std_1', initials: 'AR', name: 'Alex Rivera', studentId: 'EDU-8842', department: 'School of Computing', course: 'CS-201', attendance: 91, performance: 78, riskLevel: 'Low Risk', status: 'Active', primaryIssue: 'None' },
      { id: 'std_2', initials: 'ES', name: 'Emma Stone', studentId: 'EDU-8843', department: 'Applied Mathematics', course: 'MATH-401', attendance: 68, performance: 60, riskLevel: 'High Risk', status: 'Active', primaryIssue: 'Low Assignment Score' },
      { id: 'std_3', initials: 'JW', name: 'James Wilson', studentId: 'EDU-8844', department: 'Applied Mathematics', course: 'MATH-302', attendance: 72, performance: 65, riskLevel: 'High Risk', status: 'Active', primaryIssue: 'Frequent Absences' },
      { id: 'std_4', initials: 'MP', name: 'Mia Patel', studentId: 'EDU-8845', department: 'School of Computing', course: 'CS-303', attendance: 81, performance: 76, riskLevel: 'Medium Risk', status: 'Active', primaryIssue: 'Declining Quiz Grades' },
      { id: 'std_5', initials: 'LZ', name: 'Lucas Zhang', studentId: 'EDU-8846', department: 'School of Engineering', course: 'ENG-301', attendance: 96, performance: 95, riskLevel: 'Low Risk', status: 'Active', primaryIssue: 'None' },
      { id: 'std_6', initials: 'SM', name: 'Sophia Miller', studentId: 'EDU-8847', department: 'School of Computing', course: 'CS-405', attendance: 94, performance: 88, riskLevel: 'Low Risk', status: 'Active', primaryIssue: 'None' }
    ],

    teachers: [
      { id: 't_1', name: 'Prof. Henderson', employeeId: 'TCH-402', email: 'henderson@eduai.edu', department: 'Applied Mathematics', coursesCount: 4, studentsCount: 124, designation: 'Senior Faculty Professor', status: 'Active', phone: '+1 (555) 876-5432' },
      { id: 't_2', name: 'Dr. Alan Turing', employeeId: 'TCH-101', email: 'turing@eduai.edu', department: 'School of Computing', coursesCount: 3, studentsCount: 180, designation: 'Department Chair', status: 'Active', phone: '+1 (555) 123-4567' },
      { id: 't_3', name: 'Dr. Sarah Jenkins', employeeId: 'TCH-205', email: 's.jenkins@eduai.edu', department: 'School of Computing', coursesCount: 2, studentsCount: 95, designation: 'Associate Professor', status: 'Active', phone: '+1 (555) 987-6543' },
      { id: 't_4', name: 'Prof. Marcus Vance', employeeId: 'TCH-308', email: 'vance@eduai.edu', department: 'School of Computing', coursesCount: 3, studentsCount: 140, designation: 'Assistant Professor', status: 'Active', phone: '+1 (555) 456-7890' }
    ]
  };
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('Could not read existing database file, initializing with fresh seed data.', e);
    }

    const initial = getInitialSeedData();
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save database file:', e);
    }
  }

  public get<K extends keyof DatabaseSchema>(collection: K): DatabaseSchema[K] {
    return this.data[collection];
  }

  public set<K extends keyof DatabaseSchema>(collection: K, value: DatabaseSchema[K]): void {
    this.data[collection] = value;
    this.saveData(this.data);
  }

  public update<K extends keyof DatabaseSchema, T extends { id?: string }>(
    collection: K,
    id: string,
    updater: (item: T) => T
  ): T | null {
    const list = this.data[collection] as unknown as T[];
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;

    list[index] = updater(list[index]);
    this.saveData(this.data);
    return list[index];
  }

  public insert<K extends keyof DatabaseSchema, T>(collection: K, item: T): T {
    const list = this.data[collection] as unknown as T[];
    list.push(item);
    this.saveData(this.data);
    return item;
  }

  public delete<K extends keyof DatabaseSchema, T extends { id?: string }>(
    collection: K,
    id: string
  ): boolean {
    const list = this.data[collection] as unknown as T[];
    const initialLen = list.length;
    const filtered = list.filter((item) => item.id !== id);
    if (filtered.length !== initialLen) {
      (this.data[collection] as unknown as T[]) = filtered;
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  public getAll(): DatabaseSchema {
    return this.data;
  }

  public reset(): void {
    this.data = getInitialSeedData();
    this.saveData(this.data);
  }
}

export const db = new Database();
