import { teamMembers } from "../../data/mockTeamData";
import { Button } from "../ui/button";

export function ShiftList() {
  // Group members by role
  const roles = {
    'AML Ops Maker': teamMembers.filter(m => m.role.includes('Maker')),
    'AML Ops Checker': teamMembers.filter(m => m.role.includes('Checker'))
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-medium">Current Shifts</h2>
      </div>

      <div className="divide-y">
        {Object.entries(roles).map(([role, members]) => (
          <div key={role} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{role}</h3>
              <span className="text-sm text-gray-500">{members.length} members</span>
            </div>
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
