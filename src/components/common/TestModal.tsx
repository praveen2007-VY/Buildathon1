import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Award, HelpCircle, ArrowRight, RotateCcw, Clock, Sparkles, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTION_BANKS: Record<string, Question[]> = {
  'Database Systems': [
    {
      id: 1,
      questionText: 'Which normal form eliminates partial functional dependencies on candidate keys?',
      options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
      correctAnswer: 1,
      explanation: 'Second Normal Form (2NF) requires 1NF and ensures all non-prime attributes are fully functionally dependent on any candidate key.'
    },
    {
      id: 2,
      questionText: 'What type of SQL JOIN returns all rows from the left table and matched rows from the right table?',
      options: ['INNER JOIN', 'RIGHT JOIN', 'LEFT JOIN', 'FULL OUTER JOIN'],
      correctAnswer: 2,
      explanation: 'A LEFT JOIN returns all records from the left table and matched records from the right table. Non-matching right table columns return NULL.'
    },
    {
      id: 3,
      questionText: 'What does the ACID acronym stand for in database transaction processing?',
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Authentication, Cipher, Integrity, Data',
        'Algorithm, Complexity, Index, Distribution',
        'Allocation, Concurrency, Isolation, Deletion'
      ],
      correctAnswer: 0,
      explanation: 'ACID stands for Atomicity (all-or-nothing), Consistency (valid state transitions), Isolation (concurrent safety), and Durability (persisted commits).'
    },
    {
      id: 4,
      questionText: 'Which B-Tree index property makes logarithmic O(log N) lookup possible?',
      options: ['Self-balancing tree height', 'Random hashing', 'Unsorted sequential array', 'Depth-first search traversals'],
      correctAnswer: 0,
      explanation: 'B-Trees maintain self-balancing sorted node pointers, ensuring all leaf nodes are at identical depth for O(log N) search operations.'
    }
  ],
  'Mathematics': [
    {
      id: 1,
      questionText: 'What is the derivative of f(x) = x³ - 4x + 7 with respect to x?',
      options: ['3x² - 4', '3x² + 4', 'x² - 4', '3x³ - 4x'],
      correctAnswer: 0,
      explanation: 'Using the power rule d/dx(xⁿ) = n·xⁿ⁻¹, the derivative of x³ is 3x², derivative of -4x is -4, and derivative of constant 7 is 0.'
    },
    {
      id: 2,
      questionText: 'If matrix A has eigenvalues 3 and 5, what is the determinant of matrix A?',
      options: ['8', '15', '2', '25'],
      correctAnswer: 1,
      explanation: 'The determinant of a matrix equals the product of its eigenvalues: Det(A) = λ₁ × λ₂ = 3 × 5 = 15.'
    },
    {
      id: 3,
      questionText: 'What is the integral ∫ 2x dx?',
      options: ['x² + C', '2x² + C', 'x + C', '2 + C'],
      correctAnswer: 0,
      explanation: '∫ 2x dx = 2 × (x²/2) + C = x² + C.'
    }
  ],
  'Data Structures': [
    {
      id: 1,
      questionText: 'What is the worst-case time complexity of searching in an unbalanced Binary Search Tree (BST)?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      correctAnswer: 2,
      explanation: 'An unbalanced BST can degenerate into a linked list, resulting in O(N) worst-case time complexity for search operations.'
    },
    {
      id: 2,
      questionText: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
      options: ['Queue', 'Stack', 'Linked List', 'Binary Tree'],
      correctAnswer: 1,
      explanation: 'A Stack is a LIFO data structure where elements pushed last are popped first.'
    },
    {
      id: 3,
      questionText: 'What is the average time complexity of QuickSort?',
      options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'],
      correctAnswer: 1,
      explanation: 'QuickSort divides problem instances around pivots, achieving O(N log N) average case execution time.'
    }
  ]
};

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  testType: 'graded' | 'practice';
  subject?: string;
  onCompleted?: () => void;
}

export const TestModal: React.FC<TestModalProps> = ({
  isOpen,
  onClose,
  testType,
  subject = 'Database Systems',
  onCompleted
}) => {
  const questions = QUESTION_BANKS[subject] || QUESTION_BANKS['Database Systems'];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    grade: string;
    passed: boolean;
  } | null>(null);

  if (!isOpen) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectOption = (optionIndex: number) => {
    if (testResult) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    if (testType === 'practice') {
      setShowExplanation(prev => ({ ...prev, [currentQuestionIndex]: true }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';

    const passed = percentage >= 60;
    const resultData = { score: correctCount, total, percentage, grade, passed };

    try {
      await api.submitTestResult({
        title: `${testType === 'practice' ? 'Practice Test' : 'Assessment Test'}: ${subject}`,
        subject,
        score: correctCount,
        totalQuestions: total,
        testType
      });
    } catch (err) {
      console.warn('Backend save notice:', err);
    } finally {
      setIsSubmitting(false);
      setTestResult(resultData);
      if (onCompleted) onCompleted();
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-md animate-fadeIn">
      <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-floating w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-md bg-surface-container-low border-b border-outline-variant/30 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 font-label text-[11px] font-bold uppercase rounded-full ${testType === 'practice' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                {testType === 'practice' ? 'Interactive Practice' : 'Graded Assessment'}
              </span>
              <span className="font-label text-[12px] text-on-surface-variant font-medium">• {subject}</span>
            </div>
            <h3 className="font-title text-[18px] font-bold text-on-surface mt-1">
              {testType === 'practice' ? 'Practice Knowledge Test' : 'Subject Mastery Examination'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-lg overflow-y-auto flex-1 space-y-md">
          {testResult ? (
            /* Results View */
            <div className="text-center py-md space-y-md animate-fadeIn">
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${testResult.passed ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'}`}>
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-headline text-[24px] font-bold text-on-surface">
                  {testResult.passed ? 'Test Completed Successfully!' : 'Needs Revision'}
                </h4>
                <p className="font-body text-[14px] text-on-surface-variant mt-1">
                  Your results have been computed and recorded to your academic portfolio.
                </p>
              </div>

              {/* Score Breakdown Cards */}
              <div className="grid grid-cols-3 gap-md max-w-md mx-auto pt-sm">
                <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-xs">
                  <span className="font-label text-[12px] text-on-surface-variant font-medium uppercase">Score</span>
                  <p className="font-display text-[24px] font-bold text-primary mt-1">
                    {testResult.score} / {testResult.total}
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-xs">
                  <span className="font-label text-[12px] text-on-surface-variant font-medium uppercase">Percentage</span>
                  <p className="font-display text-[24px] font-bold text-secondary mt-1">
                    {testResult.percentage}%
                  </p>
                </div>

                <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-xs">
                  <span className="font-label text-[12px] text-on-surface-variant font-medium uppercase">Grade</span>
                  <p className={`font-display text-[24px] font-bold mt-1 ${testResult.passed ? 'text-tertiary' : 'text-error'}`}>
                    {testResult.grade}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-md flex justify-center gap-sm">
                <button
                  onClick={handleReset}
                  className="px-md py-sm bg-surface-container-low text-on-surface font-label text-[14px] font-semibold rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Test</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-lg py-sm bg-primary text-on-primary font-label text-[14px] font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
                >
                  Close & View Analytics
                </button>
              </div>
            </div>
          ) : (
            /* Active Test View */
            <div className="space-y-md">
              {/* Question Progress Tracker */}
              <div className="flex items-center justify-between font-label text-[12px] text-on-surface-variant">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Interactive Session</span>
                </div>
              </div>

              <div className="w-full bg-surface-container-high rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Body */}
              <div className="space-y-sm pt-xs">
                <h4 className="font-title text-[18px] leading-[26px] font-bold text-on-surface">
                  {currentQuestion.questionText}
                </h4>

                {/* Option Choice Buttons */}
                <div className="space-y-xs pt-sm">
                  {currentQuestion.options.map((opt, optionIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optionIdx;
                    const isCorrect = optionIdx === currentQuestion.correctAnswer;
                    const isPracticeShown = testType === 'practice' && selectedAnswers[currentQuestionIndex] !== undefined;

                    let btnStyle = 'bg-surface-container-lowest border-outline-variant/40 hover:border-primary text-on-surface';
                    if (isPracticeShown) {
                      if (isCorrect) btnStyle = 'bg-tertiary/10 border-tertiary text-tertiary font-semibold';
                      else if (isSelected) btnStyle = 'bg-error/10 border-error text-error font-semibold';
                    } else if (isSelected) {
                      btnStyle = 'bg-primary-container/20 border-primary text-primary font-semibold shadow-xs';
                    }

                    return (
                      <button
                        key={optionIdx}
                        onClick={() => handleSelectOption(optionIdx)}
                        className={`w-full p-md text-left rounded-xl border text-[14px] leading-[20px] transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-sm">
                          <span className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center font-label text-[12px] shrink-0">
                            {String.fromCharCode(65 + optionIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isPracticeShown && (
                          isCorrect ? <CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" /> :
                          isSelected ? <XCircle className="w-5 h-5 text-error shrink-0" /> : null
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Practice Mode Explanation Box */}
                {testType === 'practice' && selectedAnswers[currentQuestionIndex] !== undefined && (
                  <div className="mt-md p-md bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1 animate-fadeIn">
                    <span className="font-label text-[12px] font-bold uppercase text-primary flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Explanation
                    </span>
                    <p className="font-body text-[13px] text-on-surface-variant leading-[18px]">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!testResult && (
          <div className="p-md bg-surface-container-low border-t border-outline-variant/30 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-md py-sm bg-surface text-on-surface font-label text-[13px] font-medium rounded-lg border border-outline-variant/50 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>

            <div className="flex gap-sm">
              {isLastQuestion ? (
                <button
                  onClick={handleSubmitTest}
                  disabled={isSubmitting || Object.keys(selectedAnswers).length === 0}
                  className="px-lg py-sm bg-primary text-on-primary font-label text-[13px] font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit & Finish</span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-md py-sm bg-primary text-on-primary font-label text-[13px] font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
