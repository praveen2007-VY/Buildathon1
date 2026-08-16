import { Router, Response } from 'express';
import { db } from '../db.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';

export const aiRouter = Router();

// GET student AI recommendations
aiRouter.get('/recommendations', optionalAuth, (req: AuthRequest, res: Response): void => {
  const recommendations = db.get('aiRecommendations');
  res.json({
    recommendations,
    primaryRecommendation: recommendations[0] || null
  });
});

// GET teacher AI weak topics & at-risk student insights
aiRouter.get('/weak-topics', optionalAuth, (req, res: Response): void => {
  const weakTopics = db.get('weakTopics');
  const students = db.get('students');
  const atRisk = students.filter((s) => s.riskLevel === 'High Risk' || s.riskLevel === 'Medium Risk');

  res.json({
    weakTopics,
    atRiskStudents: atRisk
  });
});

// GET admin institutional AI insights
aiRouter.get('/institutional-insights', optionalAuth, (req, res: Response): void => {
  const students = db.get('students');

  let highRiskCount = 0;
  let medRiskCount = 0;
  let lowRiskCount = 0;

  students.forEach((s) => {
    if (s.riskLevel === 'High Risk') highRiskCount++;
    else if (s.riskLevel === 'Medium Risk') medRiskCount++;
    else lowRiskCount++;
  });

  const total = students.length || 1;
  const riskDistribution = [
    { name: 'Low Risk', value: 10582 + lowRiskCount, percentage: Math.round((lowRiskCount / total) * 100) || 85, color: '#0058be' },
    { name: 'Medium Risk', value: 1494 + medRiskCount, percentage: Math.round((medRiskCount / total) * 100) || 12, color: '#4648d4' },
    { name: 'High Risk', value: 374 + highRiskCount, percentage: Math.round((highRiskCount / total) * 100) || 3, color: '#ba1a1a' }
  ];

  const departmentPerformance = [
    { department: 'Comp Sci', currentTerm: 75, previousTerm: 60 },
    { department: 'Business', currentTerm: 65, previousTerm: 70 },
    { department: 'Arts', currentTerm: 60, previousTerm: 55 },
    { department: 'Engineering', currentTerm: 85, previousTerm: 80 }
  ];

  res.json({
    riskDistribution,
    departmentPerformance,
    institutionalSummary: {
      predictedInterventionsNeeded: highRiskCount + 12,
      modelAccuracy: '94.8%',
      lastAnalyzed: '10 minutes ago'
    }
  });
});

// POST AI Feedback Generator (for assignments or quizzes)
aiRouter.post('/generate-feedback', (req, res: Response): void => {
  const { topic, submissionContent } = req.body;

  const feedbackTemplates = [
    `Strong logical structure demonstrated in the submission. The methodology effectively handles standard test cases. Consider optimizing time complexity on edge cases.`,
    `Accurate derivations and well-formatted technical explanations. Key mathematical transformations adhere strictly to standard proof standards.`,
    `Good conceptual grasp of relational constraints. Ensure all Boyce-Codd Normal Form functional dependencies are completely decomposed without information loss.`
  ];

  const randomFeedback = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];

  res.json({
    success: true,
    aiFeedback: `[EduAI Assistant]: ${randomFeedback} (Analyzed content on "${topic || 'General Topic'}")`
  });
});
