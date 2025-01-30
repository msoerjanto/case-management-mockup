import { Button } from "../ui/button";
import { GitBranch, ArrowRight } from "lucide-react";

function WorkflowList({ onEdit }) {
  const workflows = [
    {
      id: 1,
      name: 'Account Verification',
      description: 'Customer account verification process',
      states: 5,
      activeCases: 23,
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Dispute Resolution',
      description: 'Customer dispute handling workflow',
      states: 8,
      activeCases: 45,
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Customer Onboarding',
      description: 'New customer onboarding process',
      states: 6,
      activeCases: 12,
      status: 'Draft',
      statusColor: 'bg-yellow-100 text-yellow-800',
      lastUpdated: '3 hours ago'
    }
  ];

  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">States</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Cases</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {workflows.map((workflow) => (
              <tr key={workflow.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{workflow.name}</div>
                      <div className="text-sm text-gray-500">{workflow.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{workflow.states}</td>
                <td className="px-6 py-4 text-sm">{workflow.activeCases}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${workflow.statusColor}`}>
                    {workflow.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{workflow.lastUpdated}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEdit(workflow.id)}
                    >
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
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

export { WorkflowList };