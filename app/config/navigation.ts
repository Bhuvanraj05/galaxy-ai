import {
  ChatBubbleLeftIcon,
  FolderIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BellIcon,
  ClockIcon,
  BeakerIcon,
  CubeIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  primary?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    name: 'Galaxy AI',
    href: '/ask',
    icon: ChatBubbleLeftIcon,
    primary: true
  },
  {
    name: 'Data Stores',
    href: '/data-stores',
    icon: FolderIcon
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