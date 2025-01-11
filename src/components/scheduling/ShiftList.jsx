import { teamMembers } from "../../data/mockTeamData";
import { Button } from "../ui/button";

// Create weekly shifts with different makers for each week
const weeklyShifts = [
  {
    id: 1,
    name: "Week 1 (Dec 29-Jan 4)",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(0, 2)
  },
  {
    id: 2,
    name: "Week 2 (Jan 5-11)",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(2, 4)
  },
  {
    id: 3,
    name: "Week 3 (Jan 12-18)",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(4, 6)
  },
  {
    id: 4,
    name: "Week 4 (Jan 19-25)",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(6, 8)
  },
  {
    id: 5,
    name: "Week 5 (Jan 26-Feb 1)",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(8, 10)
  }
];

export function ShiftList() {
  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-medium">January 2025 Shifts</h2>
      </div>

      <div className="divide-y">
        {weeklyShifts.map(shift => (
          <div key={shift.id} className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">{shift.name}</h3>
            <div className="grid grid-cols-2 gap-4">
              {shift.members.map(member => (
                <div 
                  key={member.id}
                  className="p-3 rounded-lg border bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">
                      {member.role}
                    </div>
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
