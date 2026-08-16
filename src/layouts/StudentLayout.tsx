import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { AlertCircle, X } from 'lucide-react';
import { EduAICopilot } from '../components/ai/EduAICopilot';

export const StudentLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [dismissError, setDismissError] = useState(false);

  const accessError = (location.state as any)?.accessError;

  return (
    <div className="bg-background text-on-background font-sans min-h-screen flex flex-col md:flex-row antialiased">
      {/* Sidebar for Desktop & Mobile Overlay */}
      <Sidebar 
        role="student" 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Mobile Overlay Background */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Container Area */}
      <div className="flex-1 flex flex-col lg:ml-[280px] min-h-screen">
        <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-margin-mobile md:p-margin-desktop overflow-y-auto bg-background">
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

      {/* Global AI Copilot */}
      <EduAICopilot />
    </div>
  );
};
