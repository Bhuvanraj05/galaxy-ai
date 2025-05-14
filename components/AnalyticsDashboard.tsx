'use client';

import { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { LightBulbIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import type { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

interface DataPoint {
  name: string;
  samples: number;
  failures: number;
  avg_time: number;
  forecast?: boolean;
}

interface Insight {
  id: string;
  type: 'trend' | 'anomaly' | 'prediction';
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string; } & RefAttributes<SVGSVGElement>>;
}

// Mock data for the charts
const monthlyData: DataPoint[] = [
  { name: 'Jan', samples: 165, failures: 12, avg_time: 3.2 },
  { name: 'Feb', samples: 180, failures: 14, avg_time: 3.0 },
  { name: 'Mar', samples: 190, failures: 10, avg_time: 2.8 },
  { name: 'Apr', samples: 210, failures: 15, avg_time: 2.9 },
  { name: 'May', samples: 235, failures: 18, avg_time: 3.1 },
  { name: 'Jun', samples: 245, failures: 12, avg_time: 2.7 },
  { name: 'Jul', samples: 260, failures: 14, avg_time: 2.5 },
  { name: 'Aug', samples: 270, failures: 16, avg_time: 2.8 },
  { name: 'Sep', samples: 290, failures: 13, avg_time: 2.6 },
  { name: 'Oct', samples: 310, failures: 17, avg_time: 2.7 },
  { name: 'Nov', samples: 320, failures: 19, avg_time: 2.9 },
  { name: 'Dec', samples: 330, failures: 21, avg_time: 3.0 },
];

// Add forecast data points
const forecastData: DataPoint[] = [
  ...monthlyData.slice(-3),
  { name: 'Jan', samples: 340, failures: 20, avg_time: 2.9, forecast: true },
  { name: 'Feb', samples: 345, failures: 19, avg_time: 2.8, forecast: true },
  { name: 'Mar', samples: 355, failures: 21, avg_time: 2.7, forecast: true },
];

// Mock AI-generated insights
const insights: Insight[] = [
  {
    id: '1',
    type: 'trend',
    title: 'Sample Volume Trend',
    description: 'Sample volume is showing a consistent upward trend with a 6.2% average monthly growth rate.',
    icon: LightBulbIcon,
  },
  {
    id: '2',
    type: 'anomaly',
    title: 'QC Failure Anomaly',
    description: 'Detected an unusual spike in QC failures for Physical tests in the last 48 hours.',
    icon: ExclamationTriangleIcon,
  },
  {
    id: '3',
    type: 'prediction',
    title: 'Turnaround Prediction',
    description: 'Based on current patterns, turnaround time is predicted to decrease by 12% in the next quarter.',
    icon: BoltIcon,
  },
];

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState('year');
  
  // Separate actual and forecast data
  const actualData = forecastData.filter(d => !d.forecast);
  const forecastOnlyData = forecastData.filter(d => d.forecast);
  
  return (
    <div className="space-y-6">
      {/* Insights section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          AI-Generated Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div 
              key={insight.id}
              className={`p-4 rounded-lg border ${
                insight.type === 'anomaly' 
                  ? 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20' 
                  : insight.type === 'prediction'
                    ? 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20'
                    : 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20'
              }`}
            >
              <div className="flex items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  insight.type === 'anomaly' 
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                    : insight.type === 'prediction'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                }`}>
                  <insight.icon className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${
                    insight.type === 'anomaly' 
                      ? 'text-red-800 dark:text-red-400' 
                      : insight.type === 'prediction'
                        ? 'text-blue-800 dark:text-blue-400'
                        : 'text-green-800 dark:text-green-400'
                  }`}>
                    {insight.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeframe selector */}
      <div className="flex space-x-2">
        <button 
          className={`px-3 py-1 text-sm rounded-md ${
            timeframe === 'month' 
              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300' 
              : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300'
          }`}
          onClick={() => setTimeframe('month')}
        >
          Month
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-md ${
            timeframe === 'quarter' 
              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300' 
              : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300'
          }`}
          onClick={() => setTimeframe('quarter')}
        >
          Quarter
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-md ${
            timeframe === 'year' 
              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300' 
              : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300'
          }`}
          onClick={() => setTimeframe('year')}
        >
          Year
        </button>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sample Volume with Forecast */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Sample Volume with Forecast
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorSamples" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338ca" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4338ca" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="samples" 
                  name="Actual Samples"
                  stroke="#4338ca" 
                  fillOpacity={1} 
                  fill="url(#colorSamples)" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  data={actualData}
                />
                <Area 
                  type="monotone" 
                  dataKey="samples" 
                  name="Forecast Samples"
                  stroke="#9333ea" 
                  strokeDasharray="5 5" 
                  fillOpacity={1} 
                  fill="url(#colorForecast)" 
                  strokeWidth={2}
                  data={forecastOnlyData}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QC Failure Rate */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            QC Failure Rate
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="failures" name="QC Failures" fill="#ef4444" />
                <Bar dataKey="samples" name="Total Samples" fill="#4338ca" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Turnaround Time */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Average Turnaround Time (Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avg_time" 
                  name="Avg. Turnaround (Days)" 
                  stroke="#14b8a6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Anomaly Detection
          </h3>
          <div className="p-6 bg-gray-50 dark:bg-slate-700/50 rounded-lg h-64 flex flex-col items-center justify-center text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-amber-500 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Unusual Pattern Detected
            </h4>
            <p className="text-gray-600 dark:text-gray-300 max-w-md">
              Significant deviation in chemical test results for Product Batch #A2938 on October 15th. 
              Correlation detected with equipment maintenance schedule.
            </p>
            <button className="mt-4 text-primary-600 font-medium text-sm hover:text-primary-800">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 