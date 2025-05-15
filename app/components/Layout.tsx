import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChatBubbleLeftRightIcon,
  ServerIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  FolderIcon,
  LinkIcon,
  Cog6ToothIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const sidebarItems = [
  { name: 'Galaxy AI', icon: ChatBubbleLeftRightIcon, href: '/ask', primary: true },
  { name: 'Data Stores', icon: ServerIcon, href: '/data-stores' },
  { name: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
  { name: 'Your Reports', icon: DocumentTextIcon, href: '/reports' },
  { name: 'Alerts', icon: ExclamationTriangleIcon, href: '/alerts' },
  { name: 'Activity Log', icon: ClockIcon, href: '/activity-log' },
  { name: 'Knowledge base', icon: FolderIcon, href: '/lab-resources' },
  { name: 'Integrations', icon: LinkIcon, href: '/integrations' },
  { name: 'Settings', icon: Cog6ToothIcon, href: '/settings' },
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#121620]">
      {/* Sidebar */}
      <div className="w-[240px] flex flex-col bg-[#121620] border-r border-gray-800">
        {/* Logo */}
        <div className="p-6">
          <Image src="/imago-ai-logo.png" alt="Imago AI" width={120} height={32} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm rounded-xl transition-colors ${
                  item.primary
                    ? 'bg-[#00C4A7] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1A1F2E]'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <Image
              src="/avatar.png"
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="ml-3 text-sm text-white">Bhuvan Raj G</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 flex items-center justify-end px-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white">
              <BellIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <MoonIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
} 