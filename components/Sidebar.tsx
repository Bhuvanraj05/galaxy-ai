'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  {
    name: 'Galaxy AI',
    href: '/ask',
    icon: '/assets/chat_1.svg',
  },
  {
    name: 'Data Stores',
    href: '/data-stores',
    icon: '/icons/data-stores.svg'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: '/icons/analytics.svg'
  },
  {
    name: 'Your Reports',
    href: '/reports',
    icon: '/icons/reports.svg'
  },
  {
    name: 'Alerts',
    href: '/alerts',
    icon: '/icons/alerts.svg'
  },
  {
    name: 'Activity Log',
    href: '/activity-log',
    icon: '/icons/activity.svg'
  },
  {
    name: 'Knowledge base',
    href: '/resources',
    icon: '/icons/lab.svg'
  },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: '/icons/integrations.svg'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: '/icons/settings.svg'
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-[#181C23] h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4">
        <Image src="/logo.svg" alt="ImagoAI" width={120} height={32} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-[#00C4A7]/10 text-[#00C4A7]'
                      : 'text-[#B0B8C1] hover:bg-[#232834] hover:text-white'
                    }`}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className={isActive ? 'opacity-100' : 'opacity-70'}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00C4A7] flex items-center justify-center">
            <span className="text-white text-sm font-medium">M</span>
          </div>
          <span className="text-sm text-white">Mike Skelley</span>
        </div>
      </div>
    </aside>
  );
} 