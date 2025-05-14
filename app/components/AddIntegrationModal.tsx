'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddIntegrationModal({ isOpen, onClose }: AddIntegrationModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-[#1A1F2E] p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-lg font-medium text-white">
                    Add New Integration
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm mb-2">
                      Integration Type
                    </label>
                    <select className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]">
                      <option value="">Select type...</option>
                      <option value="lims">LIMS System</option>
                      <option value="eln">Electronic Lab Notebook</option>
                      <option value="mes">Manufacturing Execution System</option>
                      <option value="qms">Quality Management System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">
                      Integration Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      placeholder="Enter API key"
                      className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2">
                      API Endpoint
                    </label>
                    <input
                      type="text"
                      placeholder="https://"
                      className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                  </div>

                  <button className="w-full bg-[#00C4A7] text-white py-2 rounded-lg text-sm hover:bg-[#00B39A] transition-colors mt-6">
                    Add Integration
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 