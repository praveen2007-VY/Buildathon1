import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertTriangle, CheckCircle, Play, X, ShieldAlert } from 'lucide-react';
import { studentExamsList } from '../../data/mockData';
import { StudentExam } from '../../types';

export const Exams: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<StudentExam | null>(null);
  const [examStarted, setExamStarted] = useState(false);

  const upcomingExams = studentExamsList.filter((e) => e.isUpcoming);
  const pastExams = studentExamsList.filter((e) => !e.isUpcoming);

  const handleStartExam = () => {
    setExamStarted(true);
    setTimeout(() => {
      setExamStarted(false);
      setSelectedExam(null);
    }, 2000);
  };

  return (
    <div className="space-y-lg max-w-7xl mx-auto pb-8">
      {/* Page Header */}
      <div>
        <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
          Examinations & Assessment Schedule
        </h2>
        <p className="font-body text-[14px] text-on-surface-variant mt-1">
          View upcoming midterm & final exam schedules, venues, rules, and past exam performance.
        </p>
      </div>

      {/* Upcoming Exams Cards */}
      <div className="space-y-md">
        <h3 className="font-title text-[20px] font-bold text-on-surface">Upcoming Examinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {upcomingExams.map((exam) => (
            <div 
              key={exam.id}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col justify-between gap-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-error-container text-on-error-container font-label text-[11px] font-bold rounded-bl-lg">
                Upcoming
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
                <span className="font-label text-[12px] text-error font-semibold">Mandatory Attendance</span>
                <button 
                  onClick={() => setSelectedExam(exam)}
                  className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
                >
                  View Details & Instructions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Exams Results Section */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-md shadow-card overflow-hidden">
        <h3 className="font-title text-[18px] font-semibold text-on-surface mb-md">Past Exam Results</h3>
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
                    <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary font-label text-[11px] font-bold rounded-full">
                      {exam.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

            {examStarted ? (
              <div className="py-xl text-center space-y-md">
                <Play className="w-12 h-12 text-primary mx-auto animate-bounce" />
                <h3 className="font-headline text-[22px] font-bold text-on-surface">Launching Exam Environment...</h3>
                <p className="font-body text-[14px] text-on-surface-variant">Connecting to secure proctored examination portal.</p>
              </div>
            ) : (
              <>
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
                    onClick={handleStartExam}
                    className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Play className="w-4 h-4" />
                    <span>Enter Exam Portal</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
