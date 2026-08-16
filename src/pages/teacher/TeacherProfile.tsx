import React, { useState } from 'react';
import { Edit3, Save, X, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TeacherProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Faculty Professor');
  const [email, setEmail] = useState(user?.email || 'teacher@eduai.edu');
  const [phone, setPhone] = useState('+1 (555) 876-5432');
  const [officeRoom, setOfficeRoom] = useState('Science Building - Room 402B');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
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
            Faculty Profile & Settings
          </h2>
          <p className="font-body text-[14px] text-on-surface-variant mt-1">
            Manage your faculty designation, department information, and contact details.
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
          <span>Faculty profile updated successfully!</span>
        </div>
      )}

      {/* Main Avatar & Faculty Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card flex flex-col md:flex-row items-center md:items-start gap-lg">
        <div className="w-24 h-24 rounded-full bg-secondary/10 text-secondary flex items-center justify-center border-4 border-surface-container-high shadow-md shrink-0 font-bold text-[32px]">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 space-y-xs text-center md:text-left">
          <span className="px-3 py-1 bg-primary/10 text-primary font-label text-[11px] font-bold rounded-full uppercase">
            Faculty Professor
          </span>
          <h3 className="font-headline text-[24px] font-bold text-on-surface mt-1">{name}</h3>
          <p className="font-body text-[14px] text-on-surface-variant">{email}</p>
          <p className="font-label text-[12px] text-outline font-medium">Employee ID: {user?.id || 'tch_active'}</p>
        </div>
      </div>

      {/* Details Form */}
      <form onSubmit={handleSave} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-card space-y-md">
        <h3 className="font-title text-[18px] font-bold text-on-surface pb-sm border-b border-outline-variant/20">
          Faculty Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="font-label text-[12px] text-on-surface-variant font-medium">Full Name</label>
            <input 
              type="text"
              disabled={!isEditing}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-[14px] text-on-surface disabled:opacity-80 outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label text-[12px] text-on-surface-variant font-medium">Faculty Email</label>
            <input 
              type="email"
              disabled={!isEditing}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-[14px] text-on-surface disabled:opacity-80 outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label text-[12px] text-on-surface-variant font-medium">Phone Number</label>
            <input 
              type="text"
              disabled={!isEditing}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-[14px] text-on-surface disabled:opacity-80 outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-xs">
            <label className="font-label text-[12px] text-on-surface-variant font-medium">Office Location</label>
            <input 
              type="text"
              disabled={!isEditing}
              value={officeRoom}
              onChange={(e) => setOfficeRoom(e.target.value)}
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-[14px] text-on-surface disabled:opacity-80 outline-none focus:border-primary"
            />
          </div>
        </div>

        <h3 className="font-title text-[18px] font-bold text-on-surface pt-md pb-sm border-b border-outline-variant/20">
          Department & Academic Designation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-[14px]">
          <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-1">
            <p className="font-label text-[12px] text-on-surface-variant uppercase font-semibold">Department</p>
            <p className="font-body font-bold text-on-surface">{user?.department || 'Academic Faculty'}</p>
          </div>

          <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30 space-y-1">
            <p className="font-label text-[12px] text-on-surface-variant uppercase font-semibold">Academic Rank</p>
            <p className="font-body font-bold text-on-surface">Faculty Professor</p>
          </div>
        </div>
      </form>
    </div>
  );
};
