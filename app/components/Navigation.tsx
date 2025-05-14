import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
  ClockIcon,
  LinkIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigationItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Data Stores', href: '/data-stores', icon: DocumentTextIcon },
  { name: 'Ask Galaxy AI', href: '/ask', icon: ChatBubbleLeftIcon },
  { name: 'Analytics Report', href: '/analytics', icon: ChartBarIcon },
  { name: 'Custom Report', href: '/custom-report', icon: DocumentDuplicateIcon },
  { name: 'Alerts', href: '/alerts', icon: ExclamationCircleIcon },
  { name: 'Activity Log', href: '/activity-log', icon: ClockIcon },
  { name: 'Lab Resources', href: '/lab-resources', icon: DocumentTextIcon },
  { name: 'Integrations', href: '/integrations', icon: LinkIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 mt-8">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-[#232834] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 