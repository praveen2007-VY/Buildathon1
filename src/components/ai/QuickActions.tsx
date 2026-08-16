import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { UserRole } from '../../types';

interface QuickActionsProps {
  role: UserRole | null;
  pathname: string;
  onSelectAction: (prompt: string) => void;
}

interface ActionItem {
  icon: string;
  label: string;
  prompt: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ role, pathname, onSelectAction }) => {
  // Compute page-aware contextual actions
  const getContextualActions = (): { category: string; actions: ActionItem[] } => {
    const isTeacher = role === 'teacher';
    const isAdmin = role === 'admin';

    // Page-specific overrides
    if (pathname.includes('/ai')) {
      if (isTeacher) {
        return {
          category: 'AI Analytics Context',
          actions: [
            { icon: '📊', label: 'Analyze class performance', prompt: 'Analyze class performance and overall learning trends' },
            { icon: '🔍', label: 'Find weak topics', prompt: 'Find the weakest topics across my current courses' },
            { icon: '⚠️', label: 'Identify students needing attention', prompt: 'Identify students needing immediate academic intervention' },
            { icon: '💡', label: 'Generate quiz questions', prompt: 'Generate diagnostic quiz questions for Database Normalization' },
          ],
        };
      }
      return {
        category: 'AI Diagnostics Context',
        actions: [
          { icon: '📊', label: 'Analyze my performance', prompt: 'Analyze my academic performance and diagnostic score' },
          { icon: '⚠️', label: 'Explain my weak areas', prompt: 'Explain my weak areas and what topics require practice' },
          { icon: '🎯', label: 'What should I improve?', prompt: 'What specific concepts should I improve this week?' },
          { icon: '📅', label: 'Create a study plan', prompt: 'Create an optimized weekly study plan for my courses' },
        ],
      };
    }

    if (pathname.includes('/assignments')) {
      if (isTeacher) {
        return {
          category: 'Assignments Context',
          actions: [
            { icon: '📝', label: 'Help me manage assignments', prompt: 'Help me review pending assignment submissions' },
            { icon: '📈', label: 'Summarize assignment performance', prompt: 'Summarize the performance of the latest assignment' },
            { icon: '✨', label: 'Draft rubric criteria', prompt: 'Give me rubric criteria for Database Design Assignment' },
          ],
        };
      }
      return {
        category: 'Assignments Context',
        actions: [
          { icon: '⏳', label: 'Show my pending assignments', prompt: 'Show my pending assignments and upcoming deadlines' },
          { icon: '💡', label: 'Help understand an assignment', prompt: 'Explain the requirements for my database assignment' },
          { icon: '⚡', label: 'What should I complete first?', prompt: 'Prioritize my assignments by deadline and weightage' },
        ],
      };
    }

    if (pathname.includes('/grades')) {
      if (isTeacher) {
        return {
          category: 'Grades Context',
          actions: [
            { icon: '📊', label: 'Grade distribution overview', prompt: 'Summarize the class grade distribution' },
            { icon: '🔍', label: 'Identify grade outliers', prompt: 'Identify students with significant score drops' },
          ],
        };
      }
      return {
        category: 'Grades Context',
        actions: [
          { icon: '📈', label: 'Explain my grades', prompt: 'Explain my current GPA and grade breakdown' },
          { icon: '🚀', label: 'Where am I improving?', prompt: 'Where have I shown the most score improvement?' },
          { icon: '🎯', label: 'Which subjects need attention?', prompt: 'Which subjects have the lowest scores?' },
        ],
      };
    }

    if (pathname.includes('/courses')) {
      if (isTeacher) {
        return {
          category: 'Courses Context',
          actions: [
            { icon: '📚', label: 'Review course syllabus completion', prompt: 'What is the syllabus completion status across courses?' },
            { icon: '💡', label: 'Suggest revision materials', prompt: 'Suggest revision resources for Database Systems' },
          ],
        };
      }
      return {
        category: 'Courses Context',
        actions: [
          { icon: '📚', label: 'Explain my course progress', prompt: 'Explain my completion percentage across all courses' },
          { icon: '🎯', label: 'What should I study next?', prompt: 'What module or chapter should I study next?' },
          { icon: '📖', label: 'Summarize Database Systems', prompt: 'Provide a key topic summary for Database Systems' },
        ],
      };
    }

    if (pathname.includes('/attendance')) {
      if (isTeacher) {
        return {
          category: 'Attendance Context',
          actions: [
            { icon: '⚠️', label: 'Review low attendance alerts', prompt: 'List all students with attendance below 75%' },
            { icon: '📊', label: 'Export attendance trends', prompt: 'Summarize this month attendance trends' },
          ],
        };
      }
      return {
        category: 'Attendance Context',
        actions: [
          { icon: '📋', label: 'Check my attendance status', prompt: 'What is my overall attendance and subject breakdown?' },
          { icon: '⚠️', label: 'Am I at risk of shortage?', prompt: 'Am I at risk of attendance shortage in any subject?' },
        ],
      };
    }

    if (pathname.includes('/exams')) {
      return {
        category: 'Exams Context',
        actions: [
          { icon: '📅', label: 'When is my next exam?', prompt: 'List my upcoming exams with dates and timings' },
          { icon: '🎯', label: 'Give me revision tips', prompt: 'Give me high-yield revision tips for my upcoming exams' },
          { icon: '⏱️', label: 'Time management strategy', prompt: 'How should I pace myself during 2-hour exams?' },
        ],
      };
    }

    if (pathname.includes('/schedule')) {
      return {
        category: 'Schedule Context',
        actions: [
          { icon: '⏰', label: 'What classes do I have today?', prompt: 'What is my class schedule for today?' },
          { icon: '📍', label: 'Where is my next lecture?', prompt: 'Where is my next lecture and room location?' },
        ],
      };
    }

    // Default general role actions
    if (isTeacher) {
      return {
        category: 'Teacher Quick Actions',
        actions: [
          { icon: '📊', label: 'Analyze my students', prompt: 'Analyze overall performance across all my classes' },
          { icon: '👨‍🎓', label: 'Identify struggling students', prompt: 'Identify at-risk students needing intervention' },
          { icon: '📝', label: 'Help with assessments', prompt: 'Help me review quiz and assignment scores' },
          { icon: '📈', label: 'Explain class performance', prompt: 'Explain recent score trends in Database Systems' },
          { icon: '🧭', label: 'Help me navigate EduAI', prompt: 'Show me where to manage classes, attendance, and AI insights' },
        ],
      };
    }

    if (isAdmin) {
      return {
        category: 'Admin Intelligence',
        actions: [
          { icon: '📊', label: 'System performance overview', prompt: 'Show overall academic health across departments' },
          { icon: '👥', label: 'Enrollment trends', prompt: 'Summarize student enrollment and active courses' },
          { icon: '🧭', label: 'Help me navigate EduAI', prompt: 'Show me how to manage departments, teachers, and system logs' },
        ],
      };
    }

    // Student default
    return {
      category: 'Suggested Actions',
      actions: [
        { icon: '📊', label: 'Analyze my performance', prompt: 'Analyze my overall academic performance' },
        { icon: '📚', label: 'What should I study?', prompt: 'What should I study next based on my current weak areas?' },
        { icon: '📝', label: 'Help with my assignments', prompt: 'Show my pending assignments and how to complete them' },
        { icon: '🎯', label: 'Explain my recommendations', prompt: 'Explain my AI academic recommendations and practice tests' },
        { icon: '🧭', label: 'Help me navigate EduAI', prompt: 'Give me a quick tour of EduAI features' },
      ],
    };
  };

  const { category, actions } = getContextualActions();

  return (
    <div className="space-y-2 py-2">
      <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-secondary" />
        <span>{category}</span>
      </div>

      <div className="flex flex-col gap-1.5">
        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectAction(action.prompt)}
            className="group flex items-center justify-between p-2.5 px-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/30 hover:border-secondary/30 text-left transition-all duration-200 cursor-pointer shadow-xs transform hover:scale-[1.01] active:scale-99"
            style={{
              animation: `copilotFadeUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 60}ms`,
            }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-base shrink-0">{action.icon}</span>
              <span className="text-[13px] font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                {action.label}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-on-surface-variant/60 shrink-0 group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-200" />
          </button>
        ))}
      </div>
    </div>
  );
};
