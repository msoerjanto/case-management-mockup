import { useState } from 'react';

function IntegrationTabs() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Integrations' },
    { id: 'api', label: 'API Integrations' },
    { id: 'webhooks', label: 'Webhooks' },
    { id: 'logs', label: 'Logs' }
  ];

  return (
    <div className="border-b">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export { IntegrationTabs };