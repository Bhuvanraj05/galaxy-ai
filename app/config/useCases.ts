import { 
  Cog6ToothIcon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  TruckIcon,
  CubeIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

export interface UseCase {
  id: string;
  name: string;
  icon: any;
  description: string;
  suggestedPrompts: string[];
}

export const useCases: UseCase[] = [
  {
    id: 'workflow',
    name: 'Workflow Optimization',
    icon: Cog6ToothIcon,
    description: 'Optimize laboratory workflows and processes',
    suggestedPrompts: [
      'Analyze bottlenecks in sample processing',
      'Suggest improvements for test turnaround time',
      'Review equipment utilization patterns'
    ]
  },
  {
    id: 'notebooks',
    name: 'Digital Notebooks',
    icon: BookOpenIcon,
    description: 'Manage and analyze lab notebook data',
    suggestedPrompts: [
      'Summarize experiment results from last week',
      'Compare methodologies across projects',
      'Find similar experiments in our database'
    ]
  },
  {
    id: 'vendor',
    name: 'Vendor Management',
    icon: BuildingStorefrontIcon,
    description: 'Track and analyze vendor performance',
    suggestedPrompts: [
      'Review supplier quality metrics',
      'Compare vendor delivery times',
      'Analyze reagent consistency across suppliers'
    ]
  },
  {
    id: 'compliance',
    name: 'Complaints and Audits',
    icon: ClipboardDocumentCheckIcon,
    description: 'Monitor compliance and handle audits',
    suggestedPrompts: [
      'Summarize recent compliance issues',
      'Generate audit preparation report',
      'Track resolution of quality incidents'
    ]
  },
  {
    id: 'tracking',
    name: 'Sample Tracking',
    icon: TruckIcon,
    description: 'Track samples through the lab process',
    suggestedPrompts: [
      'Locate samples in processing',
      'Review sample storage conditions',
      'Check sample testing progress'
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    icon: CubeIcon,
    description: 'Monitor and manage lab inventory',
    suggestedPrompts: [
      'Check reagent stock levels',
      'Predict consumable needs',
      'Review equipment maintenance schedule'
    ]
  }
]; 