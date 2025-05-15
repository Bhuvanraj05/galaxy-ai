import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, RocketLaunchIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
}

export default function GenerateReportModal({ isOpen, onClose, onGenerate }: GenerateReportModalProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'quality-analysis',
      name: 'Quality Analysis Report',
      description: 'Analyze quality metrics and identify trends',
      icon: DocumentTextIcon
    },
    {
      id: 'compliance-summary',
      name: 'Compliance Summary',
      description: 'Overview of compliance status and violations',
      icon: DocumentTextIcon
    },
    {
      id: 'inventory-audit',
      name: 'Inventory Audit Report',
      description: 'Detailed analysis of inventory movements',
      icon: DocumentTextIcon
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt);
    setPrompt('');
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1A1F2E] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-300 focus:outline-none"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="bg-[#1A1F2E] px-4 pb-4 pt-5 sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#00C4A7]/10 sm:mx-0 sm:h-10 sm:w-10">
                      <RocketLaunchIcon className="h-6 w-6 text-[#00C4A7]" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-white">
                        Generate Report with Galaxy AI
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-400">
                          Describe what kind of report you want to generate or select from our templates below.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-6">
                      <label htmlFor="prompt" className="block text-sm font-medium text-white mb-2">
                        Report Description
                      </label>
                      <textarea
                        id="prompt"
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full rounded-lg bg-[#232834] text-white placeholder-gray-400 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                        placeholder="E.g., Generate a report analyzing the quality metrics for batch XYZ-123, including any deviations and recommendations..."
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-white mb-2">
                        Report Templates
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => {
                              setSelectedTemplate(template.id);
                              setPrompt(`Generate a ${template.name.toLowerCase()} that ${template.description.toLowerCase()}`);
                            }}
                            className={`flex items-start p-3 rounded-lg text-left transition-colors ${
                              selectedTemplate === template.id
                                ? 'bg-[#00C4A7]/10 border border-[#00C4A7]'
                                : 'bg-[#232834] hover:bg-[#2A303E]'
                            }`}
                          >
                            <template.icon className="h-5 w-5 text-[#00C4A7] mt-0.5" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">{template.name}</p>
                              <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!prompt.trim()}
                        className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <RocketLaunchIcon className="h-4 w-4" />
                        Generate Report
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 