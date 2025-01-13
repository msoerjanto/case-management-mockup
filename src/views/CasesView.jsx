import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, Filter, AlertTriangle, Clock } from 'lucide-react';

function CasesView({ onCaseClick }) {
  const [hasUnassignedCases, setHasUnassignedCases] = useState(true);
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);

  // Example unassigned cases data
  const unassignedCases = [
    {
      id: 'CS-2024-005',
      title: 'Account Verification Issue',
      type: 'Transaction Monitoring',
      priority: 'High',
      createdAt: '2024-01-10T10:00:00',
      failedAssignmentReason: 'No available team members'
    }
  ];

  // Example all cases data
  const cases = [
    {
      id: 'CS-2024-001',
      title: 'Account Verification Issue',
      status: 'In Progress',
      statusColor: 'bg-yellow-100 text-yellow-800',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-800',
      assignedTeam: 'Technical Support',
      dueIn: '2 hours'
    },
    {
      id: 'CS-2024-005',
      title: 'Payment Processing Error',
      type: 'Customer Due Diligence',
      status: 'New',
      statusColor: 'bg-blue-100 text-blue-800',
      priority: 'High',
      priorityColor: 'bg-red-100 text-red-800',
      assignedTeam: null,
      dueIn: '1 hour'
    }
  ];

  const displayedCases = showUnassignedOnly 
    ? cases.filter(c => !c.assignedTeam)
    : cases;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Cases</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Cases Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">My Cases</div>
          <div className="text-2xl font-bold">24</div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Team Cases</div>
          <div className="text-2xl font-bold">156</div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">SLA Breached</div>
          <div className="text-2xl font-bold text-red-600">3</div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Due Today</div>
          <div className="text-2xl font-bold text-orange-600">7</div>
        </div>
      </div>

      {/* Unassigned Cases Alert */}
      {hasUnassignedCases && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-yellow-800">
                {unassignedCases.length} cases require manual assignment
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowUnassignedOnly(true)}
            >
              View Cases
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search cases..." />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={`rounded-full ${
              showUnassignedOnly ? 'bg-blue-50 text-blue-600' : ''
            }`}
            onClick={() => setShowUnassignedOnly(!showUnassignedOnly)}
          >
            Unassigned Cases
          </Button>
          <select 
            className="h-10 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
          >
            <option value="" disabled>Select Case Type</option>
            <option value="tm">Transaction Monitoring</option>
            <option value="cdd">Customer Due Diligence</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {displayedCases.map((caseItem) => (
                <tr 
                  key={caseItem.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onCaseClick(caseItem.id)}
                >
                  <td className="px-6 py-4 text-sm">{caseItem.id}</td>
                  <td className="px-6 py-4 text-sm">{caseItem.type}</td>
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
                  <td className="px-6 py-4">
                    {caseItem.assignedTeam ? (
                      <span className="text-sm text-gray-600">
                        {caseItem.assignedTeam}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center text-red-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {caseItem.dueIn}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {!caseItem.assignedTeam && (
                      <Button variant="ghost" size="sm">
                        Assign Team
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { CasesView };
