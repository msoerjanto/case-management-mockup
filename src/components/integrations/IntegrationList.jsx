import { Button } from "../ui/button";
import { Link2, Database, MessageSquare, Activity } from "lucide-react";

function IntegrationList() {
  const integrations = [
    {
      id: 1,
      name: 'Customer Database',
      type: 'API Integration',
      icon: <Database className="w-4 h-4" />,
      description: 'Core customer data integration',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastSync: '5 min ago',
      calls: '1.2K/day'
    },
    {
      id: 2,
      name: 'Notification Service',
      type: 'Webhook',
      icon: <MessageSquare className="w-4 h-4" />,
      description: 'Customer notification webhooks',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastSync: '2 min ago',
      calls: '500/day'
    },
    {
      id: 3,
      name: 'Analytics Platform',
      type: 'API Integration',
      icon: <Activity className="w-4 h-4" />,
      description: 'Real-time analytics integration',
      status: 'Configuration Required',
      statusColor: 'bg-yellow-100 text-yellow-800',
      lastSync: 'Never',
      calls: '0/day'
    }
  ];

  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Integration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Sync</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {integrations.map((integration) => (
              <tr key={integration.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                      {integration.icon}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{integration.name}</div>
                      <div className="text-sm text-gray-500">{integration.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{integration.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${integration.statusColor}`}>
                    {integration.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{integration.lastSync}</td>
                <td className="px-6 py-4 text-sm">{integration.calls}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">Configure</Button>
                    <Button variant="ghost" size="sm">Logs</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { IntegrationList };