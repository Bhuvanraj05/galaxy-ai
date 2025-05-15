import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any) => void;
}

const labSystems = [
  { id: 'lims', name: 'LIMS' },
  { id: 'eln', name: 'ELN' },
  { id: 'mes', name: 'MES' },
  { id: 'scada', name: 'SCADA' },
  { id: 'qms', name: 'QMS' },
  { id: 'dms', name: 'DMS' }
];

const steps = [
  { id: 1, name: 'Select System' },
  { id: 2, name: 'Date Range' },
  { id: 3, name: 'Field Mapping' },
  { id: 4, name: 'Confirmation' },
];

export default function ImportModal({ isOpen, onClose, onImport }: ImportModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [importData, setImportData] = useState({
    system: '',
    startDate: '',
    endDate: '',
    batchId: '',
    selectedFields: {
      test_date: 'Test Date',
      batch_name: 'Batch ID',
      test_result: 'Result',
      technician: 'Technician'
    }
  });

  const handleNext = () => {
    if (currentStep === 1 && !importData.system) {
      return; // Don't proceed if no system is selected
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onImport(importData);
      onClose();
      setCurrentStep(1); // Reset for next time
      setImportData({ ...importData, system: '' }); // Reset system selection
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getSystemName = () => {
    const system = labSystems.find(sys => sys.id === importData.system);
    return system ? system.name : 'System';
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
          <div className="fixed inset-0 bg-gray-950/75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1A1F2E] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-lg font-semibold text-white mb-8">
                        Import from {currentStep === 1 ? 'Lab System' : getSystemName()}
                      </Dialog.Title>

                      {/* Stepper */}
                      <div className="mb-8">
                        <div className="flex items-center justify-center">
                          {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                              <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                                  step.id === currentStep
                                    ? 'border-[#00C4A7] bg-[#00C4A7]/10 text-[#00C4A7]'
                                    : step.id < currentStep
                                    ? 'border-[#00C4A7] bg-[#00C4A7] text-white'
                                    : 'border-gray-600 text-gray-600'
                                }`}
                              >
                                {step.id < currentStep ? '✓' : step.id}
                              </div>
                              {index < steps.length - 1 && (
                                <div
                                  className={`w-16 h-0.5 mx-2 ${
                                    step.id < currentStep ? 'bg-[#00C4A7]' : 'bg-gray-600'
                                  }`}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="mt-4">
                        {currentStep === 1 && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-white mb-2">
                                Select Lab System
                              </label>
                              <select
                                value={importData.system}
                                onChange={(e) => setImportData({ ...importData, system: e.target.value })}
                                className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                              >
                                <option value="">Select a system</option>
                                {labSystems.map((system) => (
                                  <option key={system.id} value={system.id}>
                                    {system.name}
                                  </option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-400 mt-1">
                                Choose the lab system you want to import data from
                              </p>
                            </div>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-white mb-2">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={importData.startDate}
                                onChange={(e) => setImportData({ ...importData, startDate: e.target.value })}
                                className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white mb-2">
                                End Date
                              </label>
                              <input
                                type="date"
                                value={importData.endDate}
                                onChange={(e) => setImportData({ ...importData, endDate: e.target.value })}
                                className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white mb-2">
                                Batch ID Filter (Optional)
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. BATCH-SN-1A032"
                                value={importData.batchId}
                                onChange={(e) => setImportData({ ...importData, batchId: e.target.value })}
                                className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#00C4A7] placeholder-gray-500"
                              />
                              <p className="text-xs text-gray-400 mt-1">
                                Leave empty to import all batches within the date range
                              </p>
                            </div>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="space-y-4">
                            <p className="text-sm text-gray-400 mb-4">
                              Review field mapping before proceeding
                            </p>
                            {Object.entries(importData.selectedFields).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between bg-[#232834] p-3 rounded-lg">
                                <span className="text-gray-400">{key}</span>
                                <span className="text-white">{value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {currentStep === 4 && (
                          <div className="space-y-4">
                            <div className="bg-[#232834] p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Import Summary</h4>
                              <div className="space-y-2 text-sm">
                                <p className="text-gray-400">
                                  System: <span className="text-white">{getSystemName()}</span>
                                </p>
                                <p className="text-gray-400">
                                  Date Range: <span className="text-white">{importData.startDate} to {importData.endDate}</span>
                                </p>
                                <p className="text-gray-400">
                                  Estimated Records: <span className="text-white">65 samples</span>
                                </p>
                                <p className="text-gray-400">
                                  Fields: <span className="text-white">4 mapped fields</span>
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-400">
                              Data will be imported with the tag [{getSystemName()} Import] and status "Syncing".
                              Processing may take a few minutes for large datasets.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#232834] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentStep === 1 && !importData.system}
                    className="inline-flex w-full justify-center rounded-lg bg-[#00C4A7] px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#00C4A7]/90 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === steps.length ? 'Import Data' : 'Next'}
                  </button>
                  <button
                    type="button"
                    onClick={currentStep === 1 ? onClose : handleBack}
                    className="mt-3 inline-flex w-full justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:text-white sm:mt-0 sm:w-auto"
                  >
                    {currentStep === 1 ? 'Cancel' : 'Back'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 