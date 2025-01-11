import { teamMembers } from "../../data/mockTeamData";
import { Button } from "../ui/button";

export function ShiftList() {
  // Group members by role and shift
  const shifts = {
    'Morning Shift (9AM - 5PM)': teamMembers.filter((_, i) => i % 2 === 0),
    'Evening Shift (1PM - 9PM)': teamMembers.filter((_, i) => i % 2 === 1)
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-medium">Current Shifts</h2>
      </div>

      <div className="divide-y">
        {Object.entries(shifts).map(([shift, members]) => (
          <div key={shift} className="p-4">
            <h3 className="font-medium mb-4">{shift}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map(member => (
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
