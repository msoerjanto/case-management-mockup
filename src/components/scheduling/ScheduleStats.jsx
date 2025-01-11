import { teamMembers } from "../../data/mockTeamData";

export function ScheduleStats() {
  // Calculate stats from team members
  const totalMembers = teamMembers.length;
  const onlineMembers = teamMembers.filter(m => m.status === 'Online').length;
  const totalActiveCases = teamMembers.reduce((sum, m) => sum + m.activeCases, 0);
  const makerCount = teamMembers.filter(m => m.role.includes('Maker')).length;
  const checkerCount = teamMembers.filter(m => m.role.includes('Checker')).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white rounded-lg border p-4">
        <div className="text-sm font-medium text-gray-500">Total Team Members</div>
        <div className="text-2xl font-bold mt-2">{totalMembers}</div>
      </div>
      
      <div className="bg-white rounded-lg border p-4">
        <div className="text-sm font-medium text-gray-500">Currently Online</div>
        <div className="text-2xl font-bold mt-2 text-green-600">{onlineMembers}</div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="text-sm font-medium text-gray-500">Active Cases</div>
        <div className="text-2xl font-bold mt-2 text-blue-600">{totalActiveCases}</div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="text-sm font-medium text-gray-500">AML Ops Makers</div>
        <div className="text-2xl font-bold mt-2">{makerCount}</div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="text-sm font-medium text-gray-500">AML Ops Checkers</div>
        <div className="text-2xl font-bold mt-2">{checkerCount}</div>
      </div>
    </div>
  );
}
