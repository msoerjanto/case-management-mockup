import { teamMembers } from "../../data/mockTeamData";
import { Button } from "../ui/button";

// Create weekly shifts with different makers for each week
const weeklyShifts = [
  {
    id: 1,
    startDate: "2024-12-29",
    endDate: "2025-01-04",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(0, 2)
  },
  {
    id: 2,
    startDate: "2025-01-05",
    endDate: "2025-01-11",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(2, 4)
  },
  {
    id: 3,
    startDate: "2025-01-12",
    endDate: "2025-01-18",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(4, 6)
  },
  {
    id: 4,
    startDate: "2025-01-19",
    endDate: "2025-01-25",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(6, 8)
  },
  {
    id: 5,
    startDate: "2025-01-26",
    endDate: "2025-02-01",
    members: teamMembers.filter(m => m.role.includes('Maker')).slice(8, 10)
  }
].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

export function ShiftList() {
  const currentDate = new Date();
  
  const isShiftActive = (shift) => {
    const start = new Date(shift.startDate);
    const end = new Date(shift.endDate);
    return currentDate >= start && currentDate <= end;
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-4">
        <h2 className="text-lg font-medium">January 2025 Shifts</h2>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date Range
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Team Members
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weeklyShifts.map((shift, index) => {
              const active = isShiftActive(shift);
              return (
                <tr 
                  key={shift.id}
                  className={`${active ? 'bg-blue-50' : ''} hover:bg-gray-50`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(shift.startDate).toLocaleDateString()} - {new Date(shift.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {shift.members.map(member => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.role}</div>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
