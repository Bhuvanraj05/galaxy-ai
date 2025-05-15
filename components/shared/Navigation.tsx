import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChatBubbleLeftIcon,
  ServerIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BellIcon,
  ClockIcon,
  BeakerIcon,
  CubeIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigationItems = [
  {
    name: 'Galaxy AI',
    href: '/ask',
    icon: ChatBubbleLeftIcon,
    primary: true
  },
  {
    name: 'Data Stores',
    href: '/data-stores',
    icon: ServerIcon
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon
  },
  {
    name: 'Your Reports',
    href: '/reports',
    icon: DocumentTextIcon
  },
  {
    name: 'Alerts',
    href: '/alerts',
    icon: BellIcon
  },
  {
    name: 'Activity Log',
    href: '/activity-log',
    icon: ClockIcon
  },
  {
    name: 'Knowledge base',
    href: '/lab-resources',
    icon: BeakerIcon
  },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: CubeIcon
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon
  }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 py-4">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        const isPrimary = item.primary;
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
              transition-all duration-200
              ${isActive ? 'bg-[#1A1F2E] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1A1F2E]/50'}
              ${isPrimary ? 'bg-[#00C4A7]/10 text-[#00C4A7] hover:bg-[#00C4A7]/20 hover:text-[#00C4A7]' : ''}
            `}
          >
            <item.icon className={`h-5 w-5 ${isPrimary ? 'text-[#00C4A7]' : ''}`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 