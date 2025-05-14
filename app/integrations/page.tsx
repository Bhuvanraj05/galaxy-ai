'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { colors } from '@/app/styles/theme';
import AddIntegrationModal from '@/app/components/AddIntegrationModal';

interface Integration {
  name: string;
  lastSync: string;
  status: 'connected' | 'disconnected';
}

const initialIntegrations: Integration[] = [
  {
name: 'Galaxy',
    lastSync: '5 minutes ago',
    status: 'connected'
  },
  {
    name: 'QBench LIMS',
    lastSync: '1 hour ago',
    status: 'connected'
  }
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Integrations</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#00C4A7] hover:bg-[#00B39A] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Integration
          </button>
        </div>

        {/* LIMS Integration Section */}
        <div className="mb-12">
          <h2 className="text-xl text-white mb-6">Your Integration</h2>
          <div className="grid grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <div 
                key={integration.name}
                className="bg-[#1A1F2E] rounded-xl p-6 relative"
              >
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <XMarkIcon className="h-5 w-5" />
                </button>
                
                <h3 className="text-lg font-medium text-white mb-2">
                  {integration.name}
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Last sync: {integration.lastSync}
                </p>
                
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-[#232834] text-white rounded-lg hover:bg-[#2A2F38] transition-colors">
                    Manage
                  </button>
                  <button className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg hover:bg-[#00B39A] transition-colors">
                    Reconnect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Integration Types */}
        <div>
          <h2 className="text-xl text-white mb-6">Available Integrations</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* ELN Integration */}
            <div className="bg-[#1A1F2E] rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-2">
                Electronic Lab Notebook (ELN)
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Connect your ELN system to sync experiment data and notes
              </p>
              <button className="px-4 py-2 bg-[#232834] text-white rounded-lg hover:bg-[#2A2F38] transition-colors">
                Configure
              </button>
            </div>

            {/* MES Integration */}
            <div className="bg-[#1A1F2E] rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-2">
                Manufacturing Execution System (MES)
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Integrate with your MES for real-time production data
              </p>
              <button className="px-4 py-2 bg-[#232834] text-white rounded-lg hover:bg-[#2A2F38] transition-colors">
                Configure
              </button>
            </div>

            {/* QMS Integration */}
            <div className="bg-[#1A1F2E] rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-2">
                Quality Management System (QMS)
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Connect your QMS to track quality metrics and compliance
              </p>
              <button className="px-4 py-2 bg-[#232834] text-white rounded-lg hover:bg-[#2A2F38] transition-colors">
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Add Integration Modal */}
        <AddIntegrationModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      </div>
    </div>
  );
} 