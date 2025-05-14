'use client';

import { useState, useEffect, useRef } from 'react';
import { BellIcon, Cog6ToothIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Button from '@/components/shared/Button';
import { colors } from '@/app/styles/theme';

export default function TopBar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    // Save preference
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  // Initialize dark mode from saved preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode === 'true');
      if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return (
    <div className="flex justify-end items-center w-full px-8 pt-6 pb-2 gap-3">
      <div className="flex gap-3 relative">
        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <Button
            variant="ghost"
            icon={<BellIcon className="h-5 w-5" />}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <span className={`absolute top-0 right-0 h-2 w-2 bg-[${colors.status.error}] rounded-full`}></span>
          </Button>
          
          {showNotifications && (
            <div className={`absolute top-full right-0 mt-2 w-80 bg-[${colors.surface}] rounded-xl border border-[${colors.surfaceBorder}] shadow-lg z-50 p-4`}>
              <h3 className={`text-[${colors.primary}] font-medium mb-3`}>Notifications</h3>
              <div className="space-y-3">
                <div className={`text-[${colors.text.secondary}] text-sm`}>
                  <p className="font-medium">New Dataset Available</p>
                  <p className="text-xs opacity-75">GPC_Chickpea_QA_June.csv is ready for analysis</p>
                </div>
                <div className={`text-[${colors.text.secondary}] text-sm`}>
                  <p className="font-medium">Analysis Complete</p>
                  <p className="text-xs opacity-75">Moisture content analysis for Batch A123 completed</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div ref={settingsRef} className="relative">
          <Button
            variant="ghost"
            icon={<Cog6ToothIcon className="h-5 w-5" />}
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Settings"
          />
          
          {showSettings && (
            <div className={`absolute top-full right-0 mt-2 w-64 bg-[${colors.surface}] rounded-xl border border-[${colors.surfaceBorder}] shadow-lg z-50 p-4`}>
              <h3 className={`text-[${colors.primary}] font-medium mb-3`}>Settings</h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between text-[${colors.text.secondary}] text-sm`}>
                  <span>Notifications</span>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className={`flex items-center justify-between text-[${colors.text.secondary}] text-sm`}>
                  <span>Auto-sync Data</span>
                  <Button variant="outline" size="sm">Every 1h</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          icon={isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        />
      </div>
    </div>
  );
} 