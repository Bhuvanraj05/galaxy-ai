'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { navigationItems, NavigationItem } from '@/app/config/navigation';
import { colors, transitions } from '@/app/styles/theme';

interface SidebarProps {
  isCollapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  variant?: 'main' | 'settings' | 'resources';
  items?: NavigationItem[];
}

export default function Sidebar({ 
  isCollapsed = false, 
  onCollapse, 
  variant = 'main',
  items = navigationItems 
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const pathname = usePathname();

  const handleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapse?.(newState);
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[${colors.surface}] transition-all duration-300 ${
        collapsed ? 'w-[60px]' : 'w-[240px]'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and collapse button */}
        <div className="p-4 flex items-center justify-between">
          {!collapsed && <img src="/logo.png" alt="Galaxy AI" className="h-8" />}
          <button
            onClick={handleCollapse}
            className={`p-2 hover:bg-[${colors.surfaceHover}] rounded-lg transition-colors`}
          >
            {collapsed ? (
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    collapsed ? 'justify-center' : ''
                  } ${
                    isActive
                      ? `bg-[${colors.primary}]/10 text-[${colors.primary}]`
                      : `text-[${colors.text.secondary}] hover:bg-[${colors.surfaceHover}] hover:text-white`
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[${colors.primary}]' : ''}`} />
                  {!collapsed && <span className="text-sm">{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className={`p-4 border-t border-[${colors.surfaceBorder}]`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <div className={`h-8 w-8 rounded-full bg-[${colors.primary}] flex items-center justify-center text-white`}>
              M
            </div>
            {!collapsed && (
              <div>
                <p className="text-white text-sm">Mike Skelley</p>
                <p className="text-gray-400 text-xs">Lab Manager</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
} 