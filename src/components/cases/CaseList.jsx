import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

export function CaseList({onCaseClick}) {
  const cases = [
    {
      id: 'CS-2024-001',
      title: 'Account Verification Issue',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-800',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-800',
      assignee: 'John Smith',
      dueIn: '2 hours'
    }
    // Add more cases as needed
  ];

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {cases.map((caseItem) => (
              <tr key={caseItem.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onCaseClick('CS-2024-001')}
              >
                <td className="px-6 py-4 text-sm">{caseItem.id}</td>
                <td className="px-6 py-4 text-sm">{caseItem.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${caseItem.statusColor}`}>
                    {caseItem.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${caseItem.priorityColor}`}>
                    {caseItem.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{caseItem.assignee}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center text-red-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {caseItem.dueIn}
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