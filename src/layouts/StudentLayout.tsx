import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';

export const StudentLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Outlet />
        </main>
      </div>
    </div>
  );
};
