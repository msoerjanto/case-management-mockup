import { teamMembers } from "../../data/mockTeamData";
import { Button } from "../ui/button";

export function ShiftList() {
  // Get first 5 makers and 2 checkers
  const makers = teamMembers
    .filter(m => m.role.includes('Maker'))
    .slice(0, 5);
  const checkers = teamMembers
    .filter(m => m.role.includes('Checker'))
    .slice(0, 2);

  const currentShift = [...makers, ...checkers];

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-medium">Current Shifts</h2>
      </div>

      <div className="p-4">
        <div className="space-y-2">
          {currentShift.map(member => (
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
    </div>
  );
}
