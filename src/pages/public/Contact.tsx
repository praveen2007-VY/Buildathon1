import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-margin-mobile md:p-margin-desktop max-w-7xl mx-auto w-full min-h-screen space-y-2xl py-md">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-sm pt-md">
        <span className="font-label text-[12px] text-primary uppercase font-semibold tracking-wider">Help & Support</span>
        <h1 className="font-headline text-[32px] md:text-[48px] font-bold text-on-surface">Get in Touch with EduAI</h1>
        <p className="font-body text-[16px] text-on-surface-variant">
          Have questions about institution integration, technical support, or platform features? Our dedicated team is here to assist you.
        </p>
      </div>

      {/* Main Grid: Contact Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Contact Info Cards */}
        <div className="space-y-md">
          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex items-start gap-md">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-[16px] font-semibold text-on-surface">Email Support</h3>
              <p className="font-body text-[14px] text-on-surface-variant mt-1">support@eduai.edu</p>
              <p className="font-body text-[14px] text-on-surface-variant">admissions@eduai.edu</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex items-start gap-md">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-[16px] font-semibold text-on-surface">Phone Hotline</h3>
              <p className="font-body text-[14px] text-on-surface-variant mt-1">+1 (800) 555-EDUAI</p>
              <p className="font-body text-[14px] text-on-surface-variant">Mon-Fri 8:00 AM - 6:00 PM EST</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant/30 shadow-card flex items-start gap-md">
            <div className="w-10 h-10 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-[16px] font-semibold text-on-surface">Main Campus HQ</h3>
              <p className="font-body text-[14px] text-on-surface-variant mt-1">100 Academic Parkway, Suite 400</p>
              <p className="font-body text-[14px] text-on-surface-variant">Cambridge, MA 02138</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-card p-lg md:p-xl">
          {submitted ? (
            <div className="py-xl text-center space-y-md">
              <div className="w-16 h-16 rounded-full bg-tertiary/10 text-tertiary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-headline text-[24px] font-bold text-on-surface">Message Received!</h3>
              <p className="font-body text-[16px] text-on-surface-variant max-w-md mx-auto">
                Thank you for contacting EduAI. Our support team will review your inquiry and reply within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-lg py-sm bg-primary text-on-primary rounded-lg font-label text-[14px] font-semibold cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-md">
              <h3 className="font-headline text-[22px] font-bold text-on-surface mb-md">Send Us a Message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="cname">Your Name</label>
                  <input 
                    id="cname" 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full p-3 border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                  />
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="cemail">Email Address</label>
                  <input 
                    id="cemail" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@eduai.edu"
                    className="w-full p-3 border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="subject">Subject</label>
                <input 
                  id="subject" 
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry regarding course access or system integration"
                  className="w-full p-3 border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label text-[12px] text-on-surface font-medium" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe how we can assist you..."
                  className="w-full p-3 border border-outline-variant/60 rounded-lg font-body text-[14px] bg-surface-container-lowest focus:border-primary outline-none text-on-surface"
                />
              </div>

              <button 
                type="submit"
                className="px-xl py-md bg-primary text-on-primary font-label text-[14px] font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
