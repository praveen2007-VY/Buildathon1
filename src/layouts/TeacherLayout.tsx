import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TeacherSidebar } from '../components/common/TeacherSidebar';
import { TeacherHeader } from '../components/common/TeacherHeader';
import { AlertCircle, X } from 'lucide-react';

export const TeacherLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [dismissError, setDismissError] = useState(false);

  const accessError = (location.state as any)?.accessError;

  return (
    <div className="bg-background text-on-surface font-sans h-screen flex overflow-hidden antialiased">
      {/* Sidebar for Desktop & Mobile Overlay */}
      <TeacherSidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Mobile Overlay Background */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[280px] h-screen overflow-hidden">
        <TeacherHeader onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop bg-background space-y-lg">
          {accessError && !dismissError && (
            <div className="mb-md p-md bg-error/10 border border-error/30 rounded-xl text-error flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2 text-[14px] font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{accessError}</span>
              </div>
              <button onClick={() => setDismissError(true)} className="p-1 hover:bg-error/20 rounded-lg cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
