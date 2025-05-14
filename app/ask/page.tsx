'use client';

import { useState, useRef, useEffect } from 'react';
import type { JSX } from 'react';
import {
  PaperClipIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClipboardIcon,
  ArrowPathIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  ArrowDownTrayIcon as ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleLeftIcon,
  FolderIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BellIcon,
  ClockIcon,
  BeakerIcon,
  CubeIcon,
  Cog6ToothIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentCheckIcon,
  TruckIcon,
  BookOpenIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ScriptableContext
} from 'chart.js';
import ChatMessage from '@/components/chat/ChatMessage';
import type { ComponentProps, ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

type IconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string; } & RefAttributes<SVGSVGElement>>;

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  chart?: {
    title: string;
    data: ChartData;
  };
  canvas?: CanvasData;
  actions?: ResponseActions;
}

interface UseCase {
  id: string;
  name: string;
  icon: IconType;
  description: string;
  suggestedPrompts: string[];
}

const useCases: UseCase[] = [
  {
    id: 'workflow',
    name: 'Workflow Optimization',
    icon: Cog6ToothIcon,
    description: 'Optimize laboratory workflows and processes',
    suggestedPrompts: [
      'Based on current dryer settings, is Batch 410 at risk of low moisture?',
      'Alert me if any batch shows a pattern that previously led to QC failures.',
      'What process conditions usually result in ash content above 0.6%?',
      'Correlate pH levels from lab tests with fermentation tank pressure over time.',
      'Why did Chickpea Line A have more QC failures yesterday?'
    ]
  },
  {
    id: 'notebooks',
    name: 'Digital Notebooks',
    icon: DocumentTextIcon,
    description: 'Manage and analyze lab notebook data',
    suggestedPrompts: [
      "Summarize Lisa D's ELN notes for May 12.",
      "Rewrite Lisa's note to clarify the issue for review.",
      'Extract key observations from ELNs for failed batches.',
      'What did technicians note during recent soy QC failures?',
      'List all comments linked to borderline pH results.'
    ]
  },
  {
    id: 'vendor',
    name: 'Vendor Management',
    icon: BuildingStorefrontIcon,
    description: 'Track and analyze vendor performance',
    suggestedPrompts: [
      'Which vendors had the highest failure rates in Q1?',
      "Generate a scorecard for AgroHarvest's performance.",
      'List vendor-linked CAPAs from the last 90 days.',
      'Compare Vendor X and Y by failure rate and delivery timeliness.',
      'What\'s the complaint trend related to vendor-supplied materials?'
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance & Audits',
    icon: ClipboardDocumentCheckIcon,
    description: 'Monitor compliance and handle audits',
    suggestedPrompts: [
      'Generate compliance summary for April',
      'Show recent audit findings',
      'List non-compliance incidents'
    ]
  },
  {
    id: 'tracking',
    name: 'Sample Tracking',
    icon: DocumentTextIcon,
    description: 'Track samples through the lab process',
    suggestedPrompts: [
      'Track Batch GPC-A1245 through QA process',
      'Show samples in stability testing',
      'List pending sample analyses'
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    icon: CubeIcon,
    description: 'Monitor and manage lab inventory',
    suggestedPrompts: [
      'Which reagents are below reorder threshold?',
      'Show inventory status report',
      'List expired materials'
    ]
  }
] as const;

const datasets = [
  'LIMS Data',
  'MES Data',
  'ELN Data',
  'QMS Data',
  'Inventory Data'
] as const;

type Dataset = typeof datasets[number];

interface DataTableRow {
  technician: string;
  batchId: string;
  moisture: string;
  status: string;
}

interface CanvasData {
  title: string;
  description: string;
  chart: {
    title: string;
    data: ChartData;
  };
  dataTable?: DataTableRow[];
  additionalInfo?: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

interface ResponseActions {
  canDownload?: boolean;
  canAddToReports?: boolean;
  canCopy?: boolean;
  canRegenerate?: boolean;
}

export default function AskPage() {
  const [input, setInput] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset>('LIMS Data');
  const [showDatasetDropdown, setShowDatasetDropdown] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedCanvas, setExpandedCanvas] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleUseCaseClick = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
    setShowSuggestions(true);
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    setShowSuggestions(false);
  };

  const handleDatasetSelect = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowDatasetDropdown(false);
  };

  const simulateResponse = async (query: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response: Message;
    
    // Workflow Query 1: Batch moisture risk
    if (query.toLowerCase().includes('batch 410') && query.toLowerCase().includes('moisture')) {
      const chartData: ChartData = {
        labels: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'],
        datasets: [{
          label: 'Moisture Level (%)',
          data: [12.5, 11.8, 11.2, 10.8, 10.4, 10.1],
          backgroundColor: [
            '#00C4A7',
            '#00C4A7',
            '#FFB547',
            '#FFB547',
            '#FF5A75',
            '#FF5A75'
          ],
          borderColor: [
            '#00C4A7',
            '#00C4A7',
            '#FFB547',
            '#FFB547',
            '#FF5A75',
            '#FF5A75'
          ],
          borderWidth: 1
        }]
      };

      const tableData: DataTableRow[] = [
        { technician: 'John K.', batchId: 'Batch 410', moisture: '10.1%', status: 'At Risk' },
        { technician: 'Lisa D.', batchId: 'Batch 409', moisture: '12.3%', status: 'Normal' },
        { technician: 'Ana R.', batchId: 'Batch 408', moisture: '11.9%', status: 'Normal' },
        { technician: 'Mike P.', batchId: 'Batch 407', moisture: '12.1%', status: 'Normal' }
      ];

      response = {
        id: Date.now().toString(),
        content: "⚠️ Warning: Batch 410 is showing a concerning downward trend in moisture levels. Current reading is 10.1%, approaching the critical threshold of 10.0%. The dryer temperature has been running 2.5°C above the optimal range for the last 2 hours.\n\nRecommended Actions:\n1. Reduce dryer temperature by 2.5°C\n2. Increase moisture sampling frequency to 15-minute intervals\n3. Alert production supervisor for immediate review",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'Batch 410 Moisture Trend',
          data: chartData
        },
        canvas: {
          title: 'Moisture Risk Analysis',
          description: 'Analysis based on real-time dryer telemetry and moisture sensor data. Historical data shows that similar moisture decline patterns led to out-of-spec products in 78% of cases if not addressed within 1 hour.',
          chart: {
            title: 'Batch 410 Moisture Trend',
            data: chartData
          },
          dataTable: tableData,
          additionalInfo: 'Equipment: Dryer-A1 | Product: Chickpea Flour | Target Moisture: 12.0% ±1.5%'
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }
    
    // Workflow Query 2: QC failure patterns
    else if (query.toLowerCase().includes('pattern') && query.toLowerCase().includes('qc failures')) {
      const chartData: ChartData = {
        labels: ['Batch 401', 'Batch 402', 'Batch 403', 'Batch 404', 'Batch 405', 'Current'],
        datasets: [{
          label: 'Process Parameters',
          data: [85, 87, 89, 92, 94, 93],
          backgroundColor: [
            '#00C4A7',
            '#00C4A7',
            '#FFB547',
            '#FF5A75',
            '#FF5A75',
            '#FFB547'
          ],
          borderColor: [
            '#00C4A7',
            '#00C4A7',
            '#FFB547',
            '#FF5A75',
            '#FF5A75',
            '#FFB547'
          ],
          borderWidth: 1
        }]
      };

      const tableData: DataTableRow[] = [
        { technician: 'System', batchId: 'Current', moisture: '93%', status: 'Warning' },
        { technician: 'Lisa D.', batchId: 'Batch 405', moisture: '94%', status: 'Failed' },
        { technician: 'John K.', batchId: 'Batch 404', moisture: '92%', status: 'Failed' },
        { technician: 'Ana R.', batchId: 'Batch 403', moisture: '89%', status: 'Warning' }
      ];

      response = {
        id: Date.now().toString(),
        content: "🚨 Alert: Current process parameters are showing similarities to a pattern that led to QC failures in Batches 404 and 405.\n\nKey Observations:\n1. Rising pressure trend over last 3 batches\n2. Temperature variance increased by 15%\n3. Current parameters match 89% with previous failure pattern\n\nRecommended Actions:\n1. Adjust pressure to 85-87% range\n2. Verify temperature control system\n3. Increase sampling frequency",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'Process Parameter Trend',
          data: chartData
        },
        canvas: {
          title: 'QC Failure Pattern Analysis',
          description: 'Pattern recognition analysis comparing current process parameters with historical QC failure data. The system has identified a significant correlation with previous failure cases.',
          chart: {
            title: 'Process Parameter Trend',
            data: chartData
          },
          dataTable: tableData
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Workflow Query 3: Ash content analysis
    else if (query.toLowerCase().includes('ash content above 0.6')) {
      const chartData: ChartData = {
        labels: ['Low Temp', 'High Temp', 'Low Press', 'High Press', 'Long Time', 'Short Time'],
        datasets: [{
          label: 'Ash Content (%)',
          data: [0.45, 0.68, 0.52, 0.72, 0.58, 0.49],
          backgroundColor: [
            '#00C4A7',
            '#FF5A75',
            '#00C4A7',
            '#FF5A75',
            '#FFB547',
            '#00C4A7'
          ],
          borderColor: [
            '#00C4A7',
            '#FF5A75',
            '#00C4A7',
            '#FF5A75',
            '#FFB547',
            '#00C4A7'
          ],
          borderWidth: 1
        }]
      };

      response = {
        id: Date.now().toString(),
        content: "Analysis of historical data shows two main process conditions that consistently result in ash content above 0.6%:\n\n1. High Temperature Processing (>180°C)\n- Avg ash content: 0.68%\n- Occurrence rate: 82% of high-temp runs\n\n2. High Pressure Operations (>2.4 bar)\n- Avg ash content: 0.72%\n- Occurrence rate: 75% of high-pressure runs\n\nRecommended Process Parameters:\n- Temperature: 165-175°C\n- Pressure: 1.8-2.2 bar\n- Processing time: 45-50 minutes",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'Ash Content by Process Condition',
          data: chartData
        },
        canvas: {
          title: 'Ash Content Analysis',
          description: 'Comprehensive analysis of process conditions and their impact on ash content. Data collected from 1,200+ production runs over the last 6 months.',
          chart: {
            title: 'Ash Content by Process Condition',
            data: chartData
          }
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Workflow Query 4: pH and pressure correlation
    else if (query.toLowerCase().includes('ph') && query.toLowerCase().includes('pressure')) {
      const chartData: ChartData = {
        labels: ['6:00 AM', '8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
        datasets: [{
          label: 'pH Level',
          data: [6.8, 6.5, 6.2, 5.8, 5.5, 5.2],
          backgroundColor: Array(6).fill('#00C4A7'),
          borderColor: Array(6).fill('#00C4A7'),
          borderWidth: 1
        }, {
          label: 'Tank Pressure (bar)',
          data: [1.2, 1.5, 1.8, 2.1, 2.4, 2.7],
          backgroundColor: Array(6).fill('#FFB547'),
          borderColor: Array(6).fill('#FFB547'),
          borderWidth: 1
        }]
      };

      response = {
        id: Date.now().toString(),
        content: "Analysis reveals a strong negative correlation (-0.92) between pH levels and fermentation tank pressure:\n\n1. pH Trend:\n- Starting pH: 6.8 (optimal)\n- Current pH: 5.2 (below target)\n- Rate of change: -0.27 pH/hour\n\n2. Pressure Impact:\n- Pressure increase correlates with pH decrease\n- Critical threshold at 2.4 bar\n- Current trend suggests process adjustment needed within 2 hours\n\nRecommended Actions:\n1. Reduce tank pressure to 1.8 bar\n2. Add buffer solution if pH drops below 5.0\n3. Increase ventilation cycle frequency",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'pH vs Pressure Correlation',
          data: chartData
        },
        canvas: {
          title: 'Fermentation Analysis',
          description: 'Real-time correlation analysis between pH levels and tank pressure during fermentation. Data shows a significant inverse relationship that may affect product quality.',
          chart: {
            title: 'pH vs Pressure Correlation',
            data: chartData
          }
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Workflow Query 5: Chickpea Line QC failures
    else if (query.toLowerCase().includes('chickpea line') && query.toLowerCase().includes('qc failures')) {
      const chartData: ChartData = {
        labels: ['Moisture', 'Protein', 'Particle Size', 'Color', 'Ash Content', 'Microbial'],
        datasets: [{
          label: 'Failure Rate (%)',
          data: [45, 15, 30, 10, 25, 5],
          backgroundColor: [
            '#FF5A75',
            '#00C4A7',
            '#FFB547',
            '#00C4A7',
            '#FFB547',
            '#00C4A7'
          ],
          borderColor: [
            '#FF5A75',
            '#00C4A7',
            '#FFB547',
            '#00C4A7',
            '#FFB547',
            '#00C4A7'
          ],
          borderWidth: 1
        }]
      };

      const tableData: DataTableRow[] = [
        { technician: 'Lisa D.', batchId: 'CKP-A-023', moisture: '14.2%', status: 'Failed' },
        { technician: 'John K.', batchId: 'CKP-A-022', moisture: '13.8%', status: 'Failed' },
        { technician: 'Ana R.', batchId: 'CKP-A-021', moisture: '13.9%', status: 'Failed' },
        { technician: 'Mike P.', batchId: 'CKP-A-020', moisture: '12.1%', status: 'Passed' }
      ];

      response = {
        id: Date.now().toString(),
        content: "Analysis of Chickpea Line A's increased QC failures yesterday reveals:\n\n1. Primary Issue: Moisture Content\n- 45% of failures due to high moisture\n- Average: 14.0% (Target: 12.0% ±1.0%)\n- Affected batches: CKP-A-021 through 023\n\n2. Contributing Factors:\n- Dryer temperature fluctuation (±5°C)\n- Ambient humidity spike (78% RH)\n- Recent maintenance on moisture sensors\n\nRecommended Actions:\n1. Recalibrate dryer temperature controls\n2. Verify moisture sensor accuracy\n3. Adjust drying time by +15 minutes\n4. Review maintenance procedures",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'QC Failure Distribution',
          data: chartData
        },
        canvas: {
          title: 'Chickpea Line A Analysis',
          description: 'Detailed analysis of QC failures in Chickpea Line A, showing distribution of failure types and related process parameters. Data from the last 24 hours of production.',
          chart: {
            title: 'QC Failure Distribution',
            data: chartData
          },
          dataTable: tableData
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Digital Notebooks Query 1: Lisa's ELN notes
    else if (query.toLowerCase().includes('lisa') && query.toLowerCase().includes('may 12')) {
      const chartData: ChartData = {
        labels: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'],
        datasets: [{
          label: 'Sample Temperature (°C)',
          data: [22.1, 22.3, 22.8, 22.4, 22.2, 22.1],
          backgroundColor: Array(6).fill('#00C4A7'),
          borderColor: Array(6).fill('#00C4A7'),
          borderWidth: 1
        }]
      };

      const tableData: DataTableRow[] = [
        { technician: 'Lisa D.', batchId: 'GPC-052301', moisture: '11.8%', status: 'Completed' },
        { technician: 'Lisa D.', batchId: 'GPC-052302', moisture: '12.1%', status: 'Completed' },
        { technician: 'Lisa D.', batchId: 'GPC-052303', moisture: '11.9%', status: 'Completed' },
        { technician: 'Lisa D.', batchId: 'GPC-052304', moisture: '12.2%', status: 'In Progress' }
      ];

      response = {
        id: Date.now().toString(),
        content: "📝 Summary of Lisa D's ELN entries for May 12:\n\n1. Morning Shift (8:00 AM - 12:00 PM):\n- Calibrated moisture analyzer (ID: MA-103)\n- Processed batches GPC-052301 and GPC-052302\n- Noted slight temperature fluctuation in Lab Room 2\n\n2. Afternoon Shift (1:00 PM - 6:00 PM):\n- Completed protein analysis for previous day's samples\n- Started microbial testing for Batch GPC-052303\n- Equipment maintenance on pH meter PM-201\n\n3. Key Observations:\n- All moisture readings within specification (11.5% - 12.5%)\n- Temperature maintained at 22.3°C ± 0.5°C\n- No equipment issues reported\n\n4. Pending Tasks:\n- Complete analysis of Batch GPC-052304\n- Update calibration records\n- Handover notes for night shift",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'Lab Temperature Log',
          data: chartData
        },
        canvas: {
          title: 'ELN Analysis - May 12',
          description: 'Comprehensive summary of Electronic Lab Notebook entries by Lisa D. on May 12. Includes temperature monitoring, sample analysis, and equipment maintenance records.',
          chart: {
            title: 'Lab Temperature Log',
            data: chartData
          },
          dataTable: tableData
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Digital Notebooks Query 2: Rewrite Lisa's note
    else if (query.toLowerCase().includes('rewrite lisa') && query.toLowerCase().includes('clarify')) {
      response = {
        id: Date.now().toString(),
        content: "�� Original Note:\n\"Found irreg. readings w/ B-412, poss. contamination? Temp ok but moist. high @ 14.2%. Rerun needed + check cal. Informed JS.\"\n\n✍️ Clarified Version:\n\nDate: May 15, 2023\nTime: 14:30\nTechnician: Lisa D.\nBatch: B-412\n\nObservations:\n1. Irregular readings detected during routine analysis\n2. Moisture content measured at 14.2% (Above specification: 10.5% - 12.5%)\n3. Temperature within normal range: 22.1°C\n\nPotential Issue:\n- Possible sample contamination affecting readings\n\nActions Taken:\n1. Flagged batch for reanalysis\n2. Initiated calibration check on moisture analyzer\n3. Notified John Smith (Shift Supervisor)\n\nNext Steps:\n1. Rerun analysis with fresh sample\n2. Verify equipment calibration\n3. Document follow-up results\n\nStatus: Pending Resolution",
        role: 'assistant',
        timestamp: new Date(),
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Digital Notebooks Query 3: Failed batches observations
    else if (query.toLowerCase().includes('key observations') && query.toLowerCase().includes('failed batches')) {
      const chartData: ChartData = {
        labels: ['Equipment', 'Process', 'Material', 'Human', 'Environment', 'Method'],
        datasets: [{
          label: 'Frequency',
          data: [35, 25, 20, 10, 5, 5],
          backgroundColor: [
            '#FF5A75',
            '#FFB547',
            '#00C4A7',
            '#00C4A7',
            '#00C4A7',
            '#00C4A7'
          ],
          borderColor: [
            '#FF5A75',
            '#FFB547',
            '#00C4A7',
            '#00C4A7',
            '#00C4A7',
            '#00C4A7'
          ],
          borderWidth: 1
        }]
      };

      const tableData: DataTableRow[] = [
        { technician: 'Various', batchId: 'Multiple', moisture: 'N/A', status: 'Equipment Issue' },
        { technician: 'Various', batchId: 'Multiple', moisture: 'N/A', status: 'Process Deviation' },
        { technician: 'Various', batchId: 'Multiple', moisture: 'N/A', status: 'Material Quality' },
        { technician: 'Various', batchId: 'Multiple', moisture: 'N/A', status: 'Human Error' }
      ];

      response = {
        id: Date.now().toString(),
        content: "📊 Key Observations from Failed Batch ELN Entries (Last 30 Days):\n\n1. Equipment-Related (35%):\n- Moisture analyzer calibration drift\n- Temperature sensor malfunction\n- Inconsistent readings between devices\n\n2. Process Deviations (25%):\n- Drying time variations\n- Temperature control issues\n- Mixing speed inconsistencies\n\n3. Material Quality (20%):\n- Inconsistent raw material moisture\n- Particle size variations\n- Storage condition deviations\n\n4. Common Technician Notes:\n- \"Equipment readings unstable\"\n- \"Sample heterogeneity observed\"\n- \"Process parameters fluctuating\"\n\n5. Corrective Actions Documented:\n- Equipment maintenance schedule updated\n- Process parameters tightened\n- Material handling procedures revised",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'Failure Root Causes',
          data: chartData
        },
        canvas: {
          title: 'Failed Batch Analysis',
          description: 'Analysis of Electronic Lab Notebook entries for failed batches over the last 30 days. Data categorized by root cause and frequency of occurrence.',
          chart: {
            title: 'Failure Root Causes',
            data: chartData
          },
          dataTable: tableData
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Digital Notebooks Query 4: Soy QC failures notes
    else if (query.toLowerCase().includes('technicians note') && query.toLowerCase().includes('soy qc failures')) {
      const chartData: ChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Today'],
        datasets: [{
          label: 'QC Failures',
          data: [2, 1, 3, 4, 2, 3],
          backgroundColor: Array(6).fill('#FF5A75'),
          borderColor: Array(6).fill('#FF5A75'),
          borderWidth: 1
        }]
      };

      const tableData: DataTableRow[] = [
        { technician: 'Mike P.', batchId: 'SOY-0531', moisture: '13.8%', status: 'Failed - High Moisture' },
        { technician: 'Lisa D.', batchId: 'SOY-0530', moisture: '13.5%', status: 'Failed - High Moisture' },
        { technician: 'John K.', batchId: 'SOY-0529', moisture: '13.9%', status: 'Failed - High Moisture' },
        { technician: 'Ana R.', batchId: 'SOY-0528', moisture: '12.2%', status: 'Passed' }
      ];

      response = {
        id: Date.now().toString(),
        content: "📝 Recent Technician Notes on Soy QC Failures:\n\n1. Most Recent Observations:\n- Mike P. (Today): \"Moisture consistently high despite extended drying time. Dryer temperature verified, possible sensor issue.\"\n- Lisa D. (Yesterday): \"Raw material moisture above usual range. Supplier notification recommended.\"\n- John K. (2 days ago): \"Multiple samples showing elevated moisture. Environmental humidity may be factor.\"\n\n2. Common Themes in Notes:\n- Elevated moisture levels (13.5-13.9%)\n- Drying process inconsistencies\n- Equipment performance concerns\n\n3. Documented Actions:\n- Equipment maintenance requested\n- Supplier quality alert issued\n- Process parameters under review\n\n4. Recommendations from Notes:\n- Calibrate all moisture sensors\n- Review supplier specifications\n- Adjust drying parameters",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'Daily QC Failures',
          data: chartData
        },
        canvas: {
          title: 'Soy QC Analysis',
          description: 'Analysis of technician notes and observations regarding recent soy QC failures. Includes trending data and specific batch information.',
          chart: {
            title: 'Daily QC Failures',
            data: chartData
          },
          dataTable: tableData
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Digital Notebooks Query 5: Borderline pH comments
    else if (query.toLowerCase().includes('comments') && query.toLowerCase().includes('borderline ph')) {
      const chartData: ChartData = {
        labels: ['5.8-5.9', '6.0-6.1', '6.2-6.3', '7.8-7.9', '8.0-8.1', '8.2-8.3'],
        datasets: [{
          label: 'Frequency',
          data: [8, 12, 5, 6, 10, 7],
          backgroundColor: [
            '#FFB547',
            '#FFB547',
            '#00C4A7',
            '#00C4A7',
            '#FFB547',
            '#FFB547'
          ],
          borderColor: [
            '#FFB547',
            '#FFB547',
            '#00C4A7',
            '#00C4A7',
            '#FFB547',
            '#FFB547'
          ],
          borderWidth: 1
        }]
      };

      response = {
        id: Date.now().toString(),
        content: "📊 Analysis of Comments on Borderline pH Results:\n\n1. Lower pH Range (5.8-6.1):\n- \"Buffer solution may need replacement\"\n- \"Calibration check recommended\"\n- \"Sample temperature effect observed\"\n\n2. Upper pH Range (8.0-8.3):\n- \"Possible contamination from cleaning process\"\n- \"Storage time may be affecting readings\"\n- \"Environmental factors noted\"\n\n3. Common Observations:\n- Equipment calibration status\n- Temperature variations\n- Sample handling procedures\n\n4. Technician Recommendations:\n- Increase calibration frequency\n- Review sample preparation method\n- Document environmental conditions\n\n5. Quality Impact Notes:\n- Product stability concerns\n- Processing adjustments needed\n- Additional verification required",
        role: 'assistant',
        timestamp: new Date(),
        chart: {
          title: 'pH Distribution in Borderline Cases',
          data: chartData
        },
        canvas: {
          title: 'pH Analysis',
          description: 'Comprehensive analysis of technician comments regarding borderline pH results. Data shows distribution of pH values and frequency of occurrence.',
          chart: {
            title: 'pH Distribution in Borderline Cases',
            data: chartData
          }
        },
        actions: {
          canDownload: true,
          canAddToReports: true,
          canCopy: true,
          canRegenerate: true
        }
      };
    }

    // Default response for other queries
    else {
      response = {
        id: Date.now().toString(),
        content: `I'm analyzing your query about "${query}" using ${selectedDataset}. Please note that this query type isn't currently supported. Try one of the suggested queries for better results.`,
        role: 'assistant',
        timestamp: new Date()
      };
    }
    
    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Hide suggestions and use case grid after first message
    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    await simulateResponse(input);
  };

  return (
    <div className="min-h-screen bg-[#121620] flex">
      {/* Main Content Area */}
      <div className="flex-1 px-8 py-12 flex flex-col">
        <h1 className="text-[38px] font-semibold text-[#00C4A7] text-center mb-8">
          Ask Galaxy AI
        </h1>

        <div className="max-w-[900px] mx-auto w-full flex-1 flex flex-col">
          {/* Messages Area */}
          {messages.length > 0 && (
            <div className="flex-1 overflow-y-auto mb-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                      message.role === 'user'
                        ? 'bg-[#00C4A7] text-white'
                        : 'bg-[#1A1F2E] text-[#B0B8C1]'
                    }`}
                  >
                    <div className="space-y-4">
                      <div>{message.content}</div>
                      
                      {message.chart && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-[#121620] rounded-xl p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-medium">{message.chart.title}</h3>
                              <button
                                onClick={() => setExpandedCanvas(message.id)}
                                className="text-[#00C4A7] hover:text-[#00C4A7]/80 transition-colors"
                              >
                                <ArrowsPointingOutIcon className="h-5 w-5" />
                              </button>
                            </div>
                            <Bar
                              data={message.chart.data}
                              options={{
                                responsive: true,
                                scales: {
                                  y: {
                                    beginAtZero: true,
                                    grid: {
                                      color: '#2A2F38'
                                    },
                                    ticks: {
                                      color: '#B0B8C1'
                                    }
                                  },
                                  x: {
                                    grid: {
                                      color: '#2A2F38'
                                    },
                                    ticks: {
                                      color: '#B0B8C1'
                                    }
                                  }
                                },
                                plugins: {
                                  legend: {
                                    display: false
                                  }
                                }
                              }}
                            />
                            <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#00C4A7]" />
                                <span className="text-sm">Normal</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FFB547]" />
                                <span className="text-sm">Warning</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5A75]" />
                                <span className="text-sm">Critical</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2F38]">
                              <span className="text-sm text-[#B0B8C1]">Generated using Galaxy AI</span>
                              <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-sm text-[#00C4A7] bg-[#00C4A7]/10 rounded-lg hover:bg-[#00C4A7]/20 transition-colors">
                                  Add to Your Reports
                                </button>
                                <button className="px-3 py-1.5 text-sm text-[#00C4A7] bg-[#00C4A7]/10 rounded-lg hover:bg-[#00C4A7]/20 transition-colors">
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {message.actions && (
                        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#2A2F38]">
                          {message.actions.canAddToReports && (
                            <button className="text-[#B0B8C1] hover:text-[#00C4A7] transition-colors">
                              <HandThumbUpIcon className="h-5 w-5" />
                            </button>
                          )}
                          {message.actions.canCopy && (
                            <button className="text-[#B0B8C1] hover:text-[#00C4A7] transition-colors">
                              <HandThumbDownIcon className="h-5 w-5" />
                            </button>
                          )}
                          {message.actions.canCopy && (
                            <button className="text-[#B0B8C1] hover:text-[#00C4A7] transition-colors">
                              <ClipboardIcon className="h-5 w-5" />
                            </button>
                          )}
                          {message.actions.canRegenerate && (
                            <button className="text-[#B0B8C1] hover:text-[#00C4A7] transition-colors">
                              <ArrowPathIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1A1F2E] rounded-2xl px-6 py-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-[#B0B8C1] rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[#B0B8C1] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-[#B0B8C1] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="flex items-center bg-[#1A1F2E] rounded-2xl px-8 py-5 mb-4">
              <PaperClipIcon className="h-6 w-6 text-[#B0B8C1] mr-4" />
              <input
                type="text"
                placeholder="Ask me about below use cases"
                className="flex-1 bg-transparent outline-none text-[#B0B8C1] placeholder-[#B0B8C1] text-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDatasetDropdown(!showDatasetDropdown)}
                    className="flex items-center gap-3 bg-[#00C4A7]/10 text-[#00C4A7] px-5 py-2.5 rounded-xl font-medium border border-[#00C4A7]/30 hover:bg-[#00C4A7]/20 transition-all"
                  >
                    <span className="text-base">{selectedDataset}</span>
                    <ChevronDownIcon className="h-5 w-5" />
                  </button>

                  {showDatasetDropdown && (
                    <div className="absolute right-0 mt-3 w-64 bg-[#1A1F2E] rounded-xl shadow-lg py-2 z-10 border border-[#2A2F38]">
                      {datasets.map((dataset) => (
                        <button
                          type="button"
                          key={dataset}
                          onClick={() => handleDatasetSelect(dataset)}
                          className="w-full text-left px-5 py-3 text-base text-[#B0B8C1] hover:bg-[#2A2F38] transition-colors"
                        >
                          {dataset}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="bg-[#00C4A7] text-white p-2 rounded-xl hover:bg-[#00C4A7]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Prompt Suggestions */}
            {messages.length === 0 && showSuggestions && selectedUseCase && (
              <div className="bg-[#1A1F2E] rounded-2xl p-4 space-y-2 mb-8">
                {selectedUseCase.suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptSelect(prompt)}
                    className="w-full flex items-center gap-3 text-left px-4 py-3 text-[#B0B8C1] hover:bg-[#2A2F38] rounded-xl transition-colors group"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-[#B0B8C1] group-hover:text-[#00C4A7]" />
                    <span>{prompt}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Use Cases Grid - Only show when no messages */}
            {messages.length === 0 && (
              <div className="grid grid-cols-3 gap-6">
                {useCases.map((useCase) => (
                  <button
                    key={useCase.name}
                    onClick={() => handleUseCaseClick(useCase)}
                    className={`
                      flex items-center gap-3 bg-[#1A1F2E] text-[#B0B8C1] 
                      hover:bg-[#00C4A7]/10 hover:text-[#00C4A7] 
                      px-8 py-5 rounded-xl border border-[#2A2F38] 
                      shadow-sm transition-all group
                      ${selectedUseCase?.name === useCase.name ? 'bg-[#00C4A7]/10 text-[#00C4A7] border-[#00C4A7]/30' : ''}
                    `}
                  >
                    <useCase.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                    <span className="text-base font-medium">{useCase.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side Canvas */}
      {expandedCanvas && messages.find(m => m.id === expandedCanvas)?.canvas && (
        <div className="w-[480px] bg-[#1A1F2E] h-screen sticky top-0 right-0 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-[#2A2F38]">
            <h2 className="text-2xl font-semibold text-[#00C4A7]">
              {messages.find(m => m.id === expandedCanvas)?.canvas?.title}
            </h2>
            <button
              onClick={() => setExpandedCanvas(null)}
              className="text-[#B0B8C1] hover:text-white transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <p className="text-[#B0B8C1]">
              {messages.find(m => m.id === expandedCanvas)?.canvas?.description}
            </p>

            <div className="bg-[#121620] rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">
                {messages.find(m => m.id === expandedCanvas)?.canvas?.chart.title}
              </h3>
              <Bar
                data={messages.find(m => m.id === expandedCanvas)?.canvas?.chart.data || { labels: [], datasets: [] }}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: '#2A2F38' },
                      ticks: { color: '#B0B8C1' }
                    },
                    x: {
                      grid: { color: '#2A2F38' },
                      ticks: { color: '#B0B8C1' }
                    }
                  },
                  plugins: { legend: { display: false } }
                }}
              />
            </div>

            <div className="bg-[#121620] rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Data Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2A2F38]">
                      <th className="text-left py-3 px-4 text-[#B0B8C1]">Technician</th>
                      <th className="text-left py-3 px-4 text-[#B0B8C1]">Batch ID</th>
                      <th className="text-left py-3 px-4 text-[#B0B8C1]">Moisture (%)</th>
                      <th className="text-left py-3 px-4 text-[#B0B8C1]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.find(m => m.id === expandedCanvas)?.canvas?.dataTable?.map((row, index) => (
                      <tr key={index} className="border-b border-[#2A2F38]">
                        <td className="py-3 px-4 text-[#B0B8C1]">{row.technician}</td>
                        <td className="py-3 px-4 text-[#B0B8C1]">{row.batchId}</td>
                        <td className="py-3 px-4 text-[#B0B8C1]">{row.moisture}</td>
                        <td className="py-3 px-4 text-[#B0B8C1]">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-[#2A2F38] bg-[#1A1F2E]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#B0B8C1]">Generated using imagoAI</span>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm text-[#00C4A7] bg-[#00C4A7]/10 rounded-lg hover:bg-[#00C4A7]/20 transition-colors">
                  Add to Your Reports
                </button>
                <button className="px-4 py-2 text-sm text-[#00C4A7] bg-[#00C4A7]/10 rounded-lg hover:bg-[#00C4A7]/20 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add NavLink component
interface NavLinkProps {
  icon: any;
  text: string;
  active?: boolean;
  collapsed: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, text, active, collapsed }) => {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
        active
          ? 'bg-[#00C4A7]/10 text-[#00C4A7]'
          : 'text-gray-400 hover:bg-[#2A2F38] hover:text-white'
      }`}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{text}</span>}
    </a>
  );
}; 