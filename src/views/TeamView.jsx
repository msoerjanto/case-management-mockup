import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { UserPlus, Search, Filter, Users } from "lucide-react";

function TeamView({ onTeamClick }) {
  const teams = [
    {
      id: 1,
      name: 'AML Ops',
      description: 'Front-line investigation team for AML cases',
      memberCount: 12,
      activeCount: 8,
      lead: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'AML Compliance',
      description: 'Compliance team for AML',
      memberCount: 8,
      activeCount: 5,
      lead: 'John Smith'
    },
    {
      id: 3,
      name: 'Fraud Ops',
      description: 'Front-line investigation team for Fraud cases',
      memberCount: 6,
      activeCount: 4,
      lead: 'Michael Brown'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Total Teams</div>
          <div className="text-2xl font-bold mt-2">2</div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Total Members</div>
          <div className="text-2xl font-bold mt-2 text-blue-600">32</div>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm font-medium text-gray-500">Active Now</div>
          <div className="text-2xl font-bold mt-2 text-green-600">18</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search teams..." />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Teams List */}
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Lead</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {teams.map((team) => (
              <tr 
                key={team.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onTeamClick(team.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{team.name}</div>
                      <div className="text-sm text-gray-500">{team.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{team.memberCount}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {team.activeCount} online
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{team.lead}</td>
                <td className="px-6 py-4 text-sm">
                  <Button variant="ghost" size="sm">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TeamView };