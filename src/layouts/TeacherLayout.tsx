import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { TeacherSidebar } from '../components/common/TeacherSidebar';
import { TeacherHeader } from '../components/common/TeacherHeader';

export const TeacherLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Outlet />
        </main>
      </div>
    </div>
  );
};
