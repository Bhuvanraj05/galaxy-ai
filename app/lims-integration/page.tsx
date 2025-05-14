import LimsIntegrationConfig from '@/components/LimsIntegrationConfig';

export default function LimsIntegrationPage() {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LIMS Integration</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Connect your Laboratory Information Management System (LIMS) to Galaxy AI
        </p>
      </div>
      
      <LimsIntegrationConfig />
    </div>
  );
} 