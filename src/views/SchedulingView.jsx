import { useState } from "react";
import { Button } from "../components/ui/button";
import { Calendar as CalendarIcon, Plus, Search, Filter } from "lucide-react";
import { Input } from "../components/ui/input";
import { SchedulingDetailsView } from "./SchedulingDetailsView";

function SchedulingView() {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Mock schedules data - would come from API
  const schedules = [
    {
      id: 1,
      name: "Main Shift Schedule",
      team: "AML Operations",
      totalMembers: 27,
      activeMembers: 20,
      totalShifts: 40,
      lastUpdated: "2025-01-10"
    },
    {
      id: 2,
      name: "Weekend Coverage",
      team: "AML Operations",
      totalMembers: 27,
      activeMembers: 0,
      totalShifts: 0,
      lastUpdated: "2025-01-09",
      status: "draft"
    }
  ];

  if (selectedSchedule) {
    return (
      <SchedulingDetailsView
        scheduleId={selectedSchedule}
        onBack={() => setSelectedSchedule(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Team Scheduling</h1>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create New Schedule
          </Button>
        </div>
      </div>

      {/* Schedule List */}
      <div className="bg-white rounded-lg border">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="font-medium">Schedules</h2>
          <div className="flex gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input className="pl-10" placeholder="Search schedules..." />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Members</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Members</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Shifts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{schedule.name}</div>
                    <div className="text-xs text-gray-500">Last updated {schedule.lastUpdated}</div>
                  </div>
                </td>
                <td className="px-6 py-4">{schedule.team}</td>
                <td className="px-6 py-4">{schedule.totalMembers}</td>
                <td className="px-6 py-4">{schedule.activeMembers}</td>
                <td className="px-6 py-4">{schedule.totalShifts}</td>
                <td className="px-6 py-4">
                  {schedule.status === 'draft' ? (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedSchedule(schedule.id)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { SchedulingView };
