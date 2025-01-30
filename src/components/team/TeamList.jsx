import { Button } from "../ui/button";

function TeamList() {
  const teamMembers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      initials: 'JS',
      role: 'Senior Agent',
      status: 'Online',
      statusColor: 'bg-green-100 text-green-800',
      activeCases: 12,
      lastActive: 'Just now'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      initials: 'SJ',
      role: 'Agent',
      status: 'Away',
      statusColor: 'bg-yellow-100 text-yellow-800',
      activeCases: 8,
      lastActive: '5 min ago'
    }
  ];

  return (
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
  );
}

export { TeamList };