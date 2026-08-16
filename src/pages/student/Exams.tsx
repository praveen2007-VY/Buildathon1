import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Play, X, Award, CheckCircle, BookOpen, AlertCircle } from 'lucide-react';
import { StudentExam } from '../../types';
import { api } from '../../services/api';
import { TestModal } from '../../components/common/TestModal';

export const Exams: React.FC = () => {
  const [exams, setExams] = useState<StudentExam[]>([]);
  const [selectedExam, setSelectedExam] = useState<StudentExam | null>(null);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testSubject, setTestSubject] = useState('Database Systems');
  const [testType, setTestType] = useState<'graded' | 'practice'>('graded');
  const [isLoading, setIsLoading] = useState(true);

  const loadExams = async () => {
    setIsLoading(true);
    try {
      const res = await api.getExams();
      setExams(res.exams || []);
    } catch (e) {
      setExams([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExams();
  }, []);

  const upcomingExams = exams.filter((e) => e.isUpcoming);
  const pastExams = exams.filter((e) => !e.isUpcoming);

  const handleLaunchTest = (subject: string, mode: 'graded' | 'practice') => {
    let cleanSubject = 'Database Systems';
    if (subject.toLowerCase().includes('math')) cleanSubject = 'Mathematics';
    else if (subject.toLowerCase().includes('data structure')) cleanSubject = 'Data Structures';
    
    setTestSubject(cleanSubject);
    setTestType(mode);
    setSelectedExam(null);
    setTestModalOpen(true);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Examinations & Assessment Schedule
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            View upcoming midterm & final exam schedules, practice assessments, and exam history.
          </p>
        </div>

        <div className="flex gap-sm">
          <button
            onClick={() => handleLaunchTest('Database Systems', 'practice')}
            className="px-md py-sm bg-secondary text-on-secondary font-label text-[13px] font-semibold rounded-lg hover:bg-secondary-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Practice Test</span>
          </button>
          <button
            onClick={() => handleLaunchTest('Database Systems', 'graded')}
            className="px-md py-sm bg-primary text-on-primary font-label text-[13px] font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Play className="w-4 h-4" />
            <span>Take Test</span>
          </button>
        </div>
      </div>

      {/* Upcoming Exams Cards */}
      <div className="space-y-md">
        <h3 className="font-title text-[20px] font-bold text-on-surface">Scheduled Examinations</h3>

        {upcomingExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {upcomingExams.map((exam) => (
              <div 
                key={exam.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col justify-between gap-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary/10 text-primary font-label text-[11px] font-bold rounded-bl-lg">
                  Upcoming Assessment
                </div>

                <div>
                  <span className="font-label text-[12px] font-semibold text-primary uppercase">{exam.subject}</span>
                  <h4 className="font-title text-[20px] font-bold text-on-surface mt-1">{exam.title}</h4>
                </div>

                <div className="space-y-2 text-[14px] text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium text-on-surface">{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{exam.time} ({exam.duration})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-tertiary" />
                    <span>{exam.location}</span>
                  </div>
                </div>

                <div className="pt-md border-t border-outline-variant/20 flex justify-between items-center">
                  <span className="font-label text-[12px] text-on-surface-variant font-semibold">Proctored Assessment</span>
                  <button 
                    onClick={() => setSelectedExam(exam)}
                    className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
                  >
                    View Details & Take Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-xl text-center space-y-sm">
            <h4 className="font-title text-[18px] font-bold text-on-surface">No Scheduled Exams Right Now</h4>
            <p className="font-body text-[14px] text-on-surface-variant max-w-md mx-auto">
              You have no pending mandatory exams. You can take a Practice Test or Diagnostic Assessment anytime.
            </p>
            <button
              onClick={() => handleLaunchTest('Database Systems', 'practice')}
              className="mt-xs px-md py-sm bg-primary text-on-primary rounded-lg font-label text-[13px] font-semibold cursor-pointer"
            >
              Start Practice Test
            </button>
          </div>
        )}
      </div>

      {/* Past Exams Results Section */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md shadow-card overflow-hidden">
        <h3 className="font-title text-[18px] font-semibold text-on-surface mb-md">Past Exam & Assessment History</h3>
        {pastExams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bright border-b border-outline-variant/30">
                  <th className="p-sm pl-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Exam Title</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Subject</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Date</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Score</th>
                  <th className="p-sm font-label text-[12px] text-on-surface-variant uppercase font-medium">Grade</th>
                  <th className="p-sm pr-md font-label text-[12px] text-on-surface-variant uppercase font-medium">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {pastExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="p-sm pl-md font-body text-[14px] font-medium text-on-surface">{exam.title}</td>
                    <td className="p-sm font-body text-[14px] text-on-surface-variant">{exam.subject}</td>
                    <td className="p-sm font-body text-[14px] text-on-surface-variant">{exam.date}</td>
                    <td className="p-sm font-body text-[14px] font-bold text-on-surface">{exam.score}</td>
                    <td className="p-sm font-body text-[14px] font-bold text-primary">{exam.grade}</td>
                    <td className="p-sm pr-md">
                      <span className={`px-2.5 py-1 font-label text-[11px] font-bold rounded-full ${exam.result === 'Passed' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'}`}>
                        {exam.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-lg text-center font-body text-[14px] text-on-surface-variant">
            No past exam results recorded yet. Complete a test above to view results here.
          </div>
        )}
      </div>

      {/* Exam Details Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-surface rounded-2xl border border-outline-variant shadow-floating w-full max-w-lg p-lg relative animate-fadeIn space-y-md">
            <button 
              onClick={() => setSelectedExam(null)}
              className="absolute top-4 right-4 p-1 text-on-surface-variant hover:text-on-surface rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="font-label text-[12px] font-semibold text-primary uppercase">{selectedExam.subject}</span>
              <h3 className="font-title text-[22px] font-bold text-on-surface mt-1">{selectedExam.title}</h3>
            </div>

            <div className="bg-surface-container-low p-md rounded-lg space-y-2 text-[14px]">
              <p><strong className="text-on-surface">Date:</strong> {selectedExam.date}</p>
              <p><strong className="text-on-surface">Time:</strong> {selectedExam.time}</p>
              <p><strong className="text-on-surface">Venue:</strong> {selectedExam.location}</p>
            </div>

            {selectedExam.instructions && (
              <div className="space-y-xs">
                <h4 className="font-label text-[12px] text-on-surface-variant uppercase font-semibold">Important Exam Rules</h4>
                <ul className="list-disc pl-md text-[14px] text-on-surface space-y-1">
                  {selectedExam.instructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-sm border-t border-outline-variant/30 flex justify-end gap-sm">
              <button 
                onClick={() => setSelectedExam(null)}
                className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg"
              >
                Close
              </button>
              <button 
                onClick={() => handleLaunchTest(selectedExam.subject, 'graded')}
                className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Play className="w-4 h-4" />
                <span>Enter Test Environment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Test Modal */}
      <TestModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
        testType={testType}
        subject={testSubject}
        onCompleted={loadExams}
      />
    </div>
  );
};
