import { Button } from "../ui/button";

function ShiftList() {
  const todayShifts = [
    {
      id: 1,
      member: {
        name: 'John Smith',
        initials: 'JS',
      },
      shift: '9:00 AM - 5:00 PM',
      shiftName: 'Morning Shift',
      status: 'On Duty',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      member: {
        name: 'Sarah Johnson',
        initials: 'SJ',
      },
      shift: '1:00 PM - 9:00 PM',
      shiftName: 'Evening Shift',
      status: 'Upcoming',
      statusColor: 'bg-blue-100 text-blue-800'
    }
  ];

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Current Schedule</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {todayShifts.map((shift) => (
              <tr key={shift.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {shift.member.initials}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{shift.member.name}</div>
                      <div className="text-sm text-gray-500">{shift.shiftName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{shift.shift}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${shift.statusColor}`}>
                    {shift.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <Button variant="ghost" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { ShiftList };import { teamMembers } from "../../data/mockTeamData";

export function ShiftList() {
  // Group members by role
  const membersByRole = teamMembers.reduce((acc, member) => {
    const role = member.role;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-medium">Team Shifts</h2>
      </div>

      <div className="divide-y">
        {Object.entries(membersByRole).map(([role, members]) => (
          <div key={role} className="p-4">
            <h3 className="font-medium mb-4">{role}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map(member => (
                <div 
                  key={member.id}
                  className="p-3 rounded-lg border bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">
                      Active Cases: {member.activeCases}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium
                    ${member.status === 'Online' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'}`}
                  >
                    {member.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
