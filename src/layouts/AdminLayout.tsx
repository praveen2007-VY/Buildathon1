import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/common/AdminSidebar';
import { AdminHeader } from '../components/common/AdminHeader';

export const AdminLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex overflow-hidden antialiased">
      {/* Sidebar for Desktop & Mobile Overlay */}
      <AdminSidebar 
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
      <main className="flex-1 md:ml-[280px] h-screen overflow-y-auto bg-[#F9FAFB]">
        <AdminHeader onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <div className="p-margin-mobile md:p-margin-desktop max-w-7xl mx-auto space-y-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
