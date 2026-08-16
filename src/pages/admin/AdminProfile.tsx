import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone, Edit3, Save, X, CheckCircle2 } from 'lucide-react';
import { currentUserAdmin } from '../../data/mockData';

export const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUserAdmin.name);
  const [email, setEmail] = useState(currentUserAdmin.email);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-lg max-w-4xl mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline text-[24px] md:text-[32px] font-bold text-on-surface">
            Admin Profile & System Access
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Manage your administrator credentials and security permissions.
          </p>
        </div>

        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-primary text-on-primary font-label text-[12px] font-semibold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-surface-container-low text-on-surface font-label text-[12px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-tertiary text-on-tertiary font-label text-[12px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div className="p-md bg-tertiary/10 border border-tertiary/30 rounded-xl text-tertiary flex items-center gap-2 font-body text-[14px] font-medium animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>Administrator profile settings saved successfully!</span>
        </div>
      )}

      {/* Main Avatar & Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col md:flex-row items-center md:items-start gap-lg">
        <img 
          src={currentUserAdmin.avatar} 
          alt={currentUserAdmin.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-surface-container-high shadow-md shrink-0"
        />

        <div className="flex-1 space-y-xs text-center md:text-left">
          <span className="px-3 py-1 bg-secondary/10 text-secondary font-label text-[11px] font-bold rounded-full uppercase">
            Super Administrator
          </span>
          <h3 className="font-headline text-[24px] font-bold text-on-surface mt-1">{name}</h3>
          <p className="font-body text-[14px] text-on-surface-variant">{currentUserAdmin.title}</p>
          <p className="font-label text-[12px] text-outline font-medium">Department: {currentUserAdmin.department}</p>
        </div>
      </div>

      {/* Details Form */}
      <form onSubmit={handleSave} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
        <h3 className="font-title text-[18px] font-bold text-on-surface pb-sm border-b border-outline-variant/20">
          Account Credentials
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="font-label text-[12px] text-on-surface-variant font-medium">Administrator Name</label>
            <input 
              type="text"
              disabled={!isEditing}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-[14px] text-on-surface disabled:opacity-80 outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label text-[12px] text-on-surface-variant font-medium">System Email</label>
            <input 
              type="email"
              disabled={!isEditing}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-[14px] text-on-surface disabled:opacity-80 outline-none focus:border-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
