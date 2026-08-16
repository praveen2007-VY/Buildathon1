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

export const publicCoursesData: Course[] = [
  {
    id: 'cs-ml-101',
    title: 'Introduction to Machine Learning Algorithms',
    category: 'Computer Science',
    department: 'Computing',
    difficulty: 'Intermediate',
    instructor: 'Dr. Alan Turing',
    rating: 4.9,
    reviewsCount: 1240,
    enrolledCount: 1240,
    duration: '10 Weeks',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80',
    isAiRecommended: true,
    description: 'Master the fundamentals of machine learning including linear regression, classification algorithms, decision trees, and basic neural networks with Python.',
    outcomes: [
      'Understand core supervised & unsupervised ML algorithms',
      'Implement ML models using Scikit-Learn and PyTorch',
      'Evaluate model metrics using precision, recall, and ROC-AUC',
      'Deploy baseline predictive models to cloud services'
    ],
    syllabus: [
      { week: 'Week 1-2', topic: 'Linear Models & Gradient Descent' },
      { week: 'Week 3-4', topic: 'Classification & Support Vector Machines' },
      { week: 'Week 5-6', topic: 'Decision Trees & Ensemble Learning' },
      { week: 'Week 7-8', topic: 'Unsupervised Learning & Clustering' },
      { week: 'Week 9-10', topic: 'Neural Networks & Deep Learning Foundations' }
    ]
  },
  {
    id: 'ds-vis-201',
    title: 'Advanced Data Visualization Techniques',
    category: 'Data Science',
    department: 'Sciences',
    difficulty: 'Intermediate',
    instructor: 'Prof. Marcus Vance',
    rating: 4.7,
    reviewsCount: 856,
    enrolledCount: 856,
    duration: '8 Weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    description: 'Learn to create compelling visual narratives using Python, Seaborn, D3.js, and modern dashboard framework architectures.',
    outcomes: [
      'Design interactive data dashboards using D3.js',
      'Apply perceptual color theory to complex multi-variate plots',
      'Optimize data storytelling for executive and technical audiences'
    ],
    syllabus: [
      { week: 'Week 1-2', topic: 'Foundations of Data Representation' },
      { week: 'Week 3-4', topic: 'Interactive Visualizations with D3.js' },
      { week: 'Week 5-6', topic: 'Geospatial & Temporal Charting' },
      { week: 'Week 7-8', topic: 'Building End-to-End Analytics Dashboards' }
    ]
  },
  {
    id: 'eng-arch-301',
    title: 'Systems Architecture & Microservices Design',
    category: 'Engineering',
    department: 'Engineering',
    difficulty: 'Advanced',
    instructor: 'Dr. Elena Rostova',
    rating: 4.8,
    reviewsCount: 2100,
    enrolledCount: 2100,
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    description: 'Principles of designing scalable, fault-tolerant enterprise systems, event-driven architectures, and cloud-native microservices.',
    outcomes: [
      'Architect highly available distributed software systems',
      'Implement event-driven messaging pipelines using Kafka',
      'Design resilient database sharding & caching layers'
    ],
    syllabus: [
      { week: 'Week 1-3', topic: 'Monolith to Microservices Decomposition' },
      { week: 'Week 4-6', topic: 'Event Sourcing & CQRS Pattern' },
      { week: 'Week 7-9', topic: 'Distributed Consensus & Fault Tolerance' },
      { week: 'Week 10-12', topic: 'Cloud Deployment & System Reliability' }
    ]
  },
  {
    id: 'hum-ai-102',
    title: 'Ethics & Governance in Artificial Intelligence',
    category: 'Humanities',
    department: 'Humanities',
    difficulty: 'Beginner',
    instructor: 'Dr. Sarah Jenkins',
    rating: 4.95,
    reviewsCount: 3120,
    enrolledCount: 3120,
    duration: '6 Weeks',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    description: 'Explore the societal, legal, and moral implications of artificial intelligence deployment in healthcare, education, and public policy.',
    outcomes: [
      'Analyze algorithmic bias & fairness auditing techniques',
      'Evaluate global AI regulations and compliance frameworks',
      'Develop responsible AI governance principles for organizations'
    ],
    syllabus: [
      { week: 'Week 1-2', topic: 'Algorithmic Fairness & Bias Mitigation' },
      { week: 'Week 3-4', topic: 'Privacy, Surveillance & Data Governance' },
      { week: 'Week 5-6', topic: 'Policy, Regulation & AI Safety Guidelines' }
    ]
  },
  {
    id: 'sci-bio-401',
    title: 'Computational Biology & Genomics',
    category: 'Sciences',
    department: 'Sciences',
    difficulty: 'Advanced',
    instructor: 'Dr. Alan Turing',
    rating: 4.88,
    reviewsCount: 1200,
    enrolledCount: 1200,
    duration: '10 Weeks',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    description: 'Apply computational algorithms, sequence alignment models, and machine learning to analyze large-scale genomic sequencing datasets.',
    outcomes: [
      'Process next-generation DNA sequencing data using BioPython',
      'Construct phylogenetic trees and sequence alignment models',
      'Apply machine learning to protein folding prediction'
    ],
    syllabus: [
      { week: 'Week 1-2', topic: 'Genome Assembly & Sequence Alignment' },
      { week: 'Week 3-5', topic: 'Gene Expression Analysis & Transcriptomics' },
      { week: 'Week 6-8', topic: 'Structural Bioinformatics & Protein Folding' },
      { week: 'Week 9-10', topic: 'Machine Learning Applications in Precision Medicine' }
    ]
  }
];
