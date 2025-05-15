'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon } from '@heroicons/react/24/solid';

// Industries data with their categories
const industries = [
  {
    id: 'pharma',
    name: 'Pharmaceuticals & Biotechnology',
    categories: ['Drug Development', 'Manufacturing', 'Quality Control', 'R&D', 'Clinical Trials']
  },
  {
    id: 'materials',
    name: 'Materials & Manufacturing',
    categories: ['Metals', 'Polymers', 'Composites', 'Electronics', 'Quality Testing']
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Personal Care',
    categories: ['Formulation', 'Stability Testing', 'Regulatory', 'Quality Assurance']
  },
  {
    id: 'oil',
    name: 'Oil, Gas & Chemicals',
    categories: ['Refining', 'Petrochemicals', 'Environmental', 'Quality Control']
  },
  {
    id: 'clinical',
    name: 'Clinical & Diagnostic Labs',
    categories: ['Medical Testing', 'Pathology', 'Molecular Diagnostics', 'Immunology']
  },
  {
    id: 'environmental',
    name: 'Environmental Testing',
    categories: ['Water Analysis', 'Air Quality', 'Soil Testing', 'Compliance']
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    categories: ['Quality Testing', 'Microbiology', 'Nutritional Analysis', 'Safety']
  }
];

// Roles data
const roles = [
  { id: 'lab_manager', name: 'Lab Manager' },
  { id: 'qa_analyst', name: 'QA Analyst' },
  { id: 'data_scientist', name: 'Data Scientist / Analyst' },
  { id: 'lab_tech', name: 'Lab Technician' },
  { id: 'process_engineer', name: 'Process Engineer/Operator' },
  { id: 'plant_manager', name: 'Plant Manager' },
  { id: 'director', name: 'Director' },
  { id: 'vp', name: 'VP' }
];

// Integration options data
const integrations = [
  {
    id: 'lims',
    name: 'LIMS',
    description: 'Laboratory Information Management System',
    examples: 'LabWare, STARLIMS, Thermo Fisher SampleManager',
    icon: '🧪'
  },
  {
    id: 'mes',
    name: 'MES',
    description: 'Manufacturing Execution System',
    examples: 'Siemens Opcenter, Rockwell FactoryTalk, Honeywell POMS',
    icon: '🏭'
  },
  {
    id: 'scada',
    name: 'SCADA/Historian',
    description: 'Process data and sensor readings',
    examples: 'OSIsoft PI System, AVEVA, GE Proficy',
    icon: '📊'
  },
  {
    id: 'erp',
    name: 'ERP',
    description: 'Enterprise Resource Planning',
    examples: 'SAP, Oracle, Microsoft Dynamics',
    icon: '🏢'
  },
  {
    id: 'eln',
    name: 'ELN',
    description: 'Electronic Lab Notebook',
    examples: 'Benchling, LabArchives, LabWare ELN',
    icon: '📓'
  },
  {
    id: 'qms',
    name: 'QMS',
    description: 'Quality Management System',
    examples: 'MasterControl, Veeva Vault QMS, TrackWise',
    icon: '✅'
  },
  {
    id: 'bms',
    name: 'BMS',
    description: 'Batch Management System',
    examples: 'DeltaV Batch, Siemens PCS 7, Rockwell PharmaSuite',
    icon: '🧩'
  },
  {
    id: 'dw',
    name: 'Data Lake/Warehouse',
    description: 'Centralized data repository',
    examples: 'Snowflake, AWS Redshift, Azure Data Lake, Databricks',
    icon: '☁️'
  },
  {
    id: 'dms',
    name: 'Document Management',
    description: 'Document storage and management',
    examples: 'SharePoint, Documentum, Egnyte',
    icon: '📄'
  }
];

// Onboarding steps
const steps = [
  { id: 'industry', name: 'Industry' },
  { id: 'role', name: 'Role' },
  { id: 'categories', name: 'Categories' },
  { id: 'integrations', name: 'Integrations' },
  { id: 'resources', name: 'Knowledge base' }
];

export default function OnboardingFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete, redirect to dashboard
      router.push('/');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
    // Reset categories when industry changes
    setSelectedCategories([]);
  };

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleIntegrationToggle = (integrationId: string) => {
    if (selectedIntegrations.includes(integrationId)) {
      setSelectedIntegrations(selectedIntegrations.filter(i => i !== integrationId));
    } else {
      setSelectedIntegrations([...selectedIntegrations, integrationId]);
    }
  };

  const getSelectedIndustryCategories = () => {
    if (!selectedIndustry) return [];
    const industry = industries.find(i => i.id === selectedIndustry);
    return industry ? industry.categories : [];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to Galaxy AI
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Let's personalize your experience
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav className="flex justify-center">
            <ol className="flex items-center w-full max-w-md">
              {steps.map((step, index) => (
                <li key={step.id} className={`flex items-center ${
                  index < steps.length - 1 ? 'w-full' : ''
                }`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index < currentStep 
                      ? 'bg-primary-600 text-white' 
                      : index === currentStep 
                        ? 'bg-primary-100 border-2 border-primary-600 text-primary-600' 
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {index < currentStep ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  
                  <span className={`ml-2 text-sm ${
                    index <= currentStep 
                      ? 'text-primary-600 font-medium' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-2 ${
                      index < currentStep 
                        ? 'bg-primary-600' 
                        : 'bg-gray-300 dark:bg-slate-700'
                    }`}></div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Content Box */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-6">
          {/* Step 1: Industry Selection */}
          {currentStep === 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select Your Industry
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((industry) => (
                  <button
                    key={industry.id}
                    className={`p-4 rounded-lg border text-left flex items-center hover:border-primary-600 transition-colors ${
                      selectedIndustry === industry.id 
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                        : 'border-gray-200 dark:border-slate-700'
                    }`}
                    onClick={() => handleIndustrySelect(industry.id)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      selectedIndustry === industry.id 
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300'
                    }`}>
                      {industry.id.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {industry.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Role Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select Your Role
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    className={`p-4 rounded-lg border text-left flex items-center hover:border-primary-600 transition-colors ${
                      selectedRole === role.id 
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                        : 'border-gray-200 dark:border-slate-700'
                    }`}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      selectedRole === role.id 
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300'
                    }`}>
                      {role.id.split('_').map(word => word.charAt(0).toUpperCase()).join('')}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {role.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Categories */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select Categories
              </h2>
              {selectedIndustry ? (
                <div className="space-y-3">
                  {getSelectedIndustryCategories().map((category) => (
                    <div 
                      key={category}
                      className={`p-3 rounded-lg border flex items-center cursor-pointer hover:border-primary-600 transition-colors ${
                        selectedCategories.includes(category) 
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                          : 'border-gray-200 dark:border-slate-700'
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center mr-3 ${
                        selectedCategories.includes(category) 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400'
                      }`}>
                        {selectedCategories.includes(category) && (
                          <CheckIcon className="w-4 h-4" />
                        )}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {category}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    Please select an industry first.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Integrations */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Select Data Integrations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Choose the data sources you want to connect to Galaxy AI.
              </p>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div 
                    key={integration.id}
                    className={`p-4 rounded-lg border cursor-pointer hover:border-primary-600 transition-colors ${
                      selectedIntegrations.includes(integration.id) 
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                        : 'border-gray-200 dark:border-slate-700'
                    }`}
                    onClick={() => handleIntegrationToggle(integration.id)}
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {integration.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {integration.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {integration.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Examples: {integration.examples}
                        </p>
                      </div>
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        selectedIntegrations.includes(integration.id) 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400'
                      }`}>
                        {selectedIntegrations.includes(integration.id) && (
                          <CheckIcon className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Knowledge base */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Knowledge base
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Upload your critical lab documents to enhance Galaxy AI's capabilities.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Supported types: PDFs, Word docs, Excel, Text files
                </p>
                <button className="btn-primary mt-2">
                  Browse Files
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Suggested Document Types:
                </h3>
                <ul className="grid grid-cols-2 gap-2 text-sm">
                  <li className="text-gray-600 dark:text-gray-300">• SOPs</li>
                  <li className="text-gray-600 dark:text-gray-300">• QC Protocols</li>
                  <li className="text-gray-600 dark:text-gray-300">• Calibration Logs</li>
                  <li className="text-gray-600 dark:text-gray-300">• Regulatory Guidelines</li>
                  <li className="text-gray-600 dark:text-gray-300">• Audit Logs</li>
                  <li className="text-gray-600 dark:text-gray-300">• CAPA Reports</li>
                  <li className="text-gray-600 dark:text-gray-300">• Training Records</li>
                  <li className="text-gray-600 dark:text-gray-300">• MSDS</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevStep}
            className={`btn-secondary ${currentStep === 0 ? 'invisible' : ''}`}
          >
            Back
          </button>
          <button
            onClick={handleNextStep}
            className="btn-primary"
            disabled={
              (currentStep === 0 && !selectedIndustry) ||
              (currentStep === 1 && !selectedRole)
            }
          >
            {currentStep === steps.length - 1 ? 'Finish Setup' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
} 