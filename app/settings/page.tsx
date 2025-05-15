'use client';

import { useState } from 'react';
import { UserIcon, BellIcon, SunIcon, DocumentTextIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

// Navigation items
const navigationItems = [
  { id: 'profile', name: 'Profile', icon: UserIcon, current: true },
  { id: 'notification', name: 'Notification', icon: BellIcon, current: false },
  { id: 'appearance', name: 'Appearance', icon: SunIcon, current: false },
  { id: 'data-preferences', name: 'Data Preferences', icon: DocumentTextIcon, current: false },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon, current: false },
  { id: 'account', name: 'Account', icon: GlobeAltIcon, current: false }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@limsai.com',
    jobRole: 'Lab Technician',
    department: 'Quality Control',
    labName: 'Galaxy Insights Lab',
    labId: 'GLX-2024-001'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Implementation for saving profile changes
    console.log('Saving profile changes:', formData);
  };

  return (
    <main className="min-h-screen bg-[#121620] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <span className="text-gray-400 mr-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3765 17.7642 20.3765 18.295C20.3765 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2965 18.375 20.2965C17.8442 20.2965 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1046 13.1846 23 12.08 23C10.9754 23 10.08 22.1046 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74486 20.1656 6.23582 20.3765 5.705 20.3765C5.17418 20.3765 4.66514 20.1656 4.29 19.79C3.91445 19.4149 3.70351 18.9058 3.70351 18.375C3.70351 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95231 15.6971 4.68 15.08C4.42093 14.4755 3.82758 14.0826 3.17 14.08H3C1.89543 14.08 1 13.1846 1 12.08C1 10.9754 1.89543 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87231 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74486 3.62351 6.23582 3.62351 5.705C3.62351 5.17418 3.83445 4.66514 4.21 4.29C4.58514 3.91445 5.09418 3.70351 5.625 3.70351C6.15582 3.70351 6.66486 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95231 8.92 4.68H9C9.60447 4.42093 9.99738 3.82758 10 3.17V3C10 1.89543 10.8954 1 12 1C13.1046 1 14 1.89543 14 3V3.09C14.0026 3.74758 14.3955 4.34093 15 4.6C15.6171 4.87231 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62351 18.295 3.62351C18.8258 3.62351 19.3349 3.83445 19.71 4.21C20.0856 4.58514 20.2965 5.09418 20.2965 5.625C20.2965 6.15582 20.0856 6.66486 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
        </div>

        <div className="flex gap-6">
          {/* Navigation Sidebar */}
          <div className="w-64 bg-[#1A1F2E] rounded-xl p-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#232834] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#1A1F2E] rounded-xl p-6">
            {activeSection === 'profile' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-medium text-white">Profile Settings</h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Job Role</label>
                    <input
                      type="text"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleInputChange}
                      className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Lab Name</label>
                    <input
                      type="text"
                      name="labName"
                      value={formData.labName}
                      onChange={handleInputChange}
                      className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">Lab ID</label>
                    <input
                      type="text"
                      name="labId"
                      value={formData.labId}
                      onChange={handleInputChange}
                      className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Placeholder for other sections */}
            {activeSection !== 'profile' && (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-white mb-2">{
                  navigationItems.find(item => item.id === activeSection)?.name
                } Settings</h2>
                <p className="text-gray-400">This section is under development</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 