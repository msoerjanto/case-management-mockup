import { Button } from "../components/ui/button";
import { Calendar as CalendarIcon, ChevronRight } from "lucide-react";
import { teamMembers } from "../data/mockTeamData";
import { ScheduleStats } from "../components/scheduling/ScheduleStats";
import { Calendar } from "../components/scheduling/Calendar";
import { ShiftList } from "../components/scheduling/ShiftList";

function SchedulingDetailsView({ scheduleId, onBack }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button 
              onClick={onBack}
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Schedules
            </button>
          </div>
          <h1 className="text-2xl font-bold">January 2025 Schedule</h1>
          <p className="text-gray-500">AML Operations Team Schedule</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Add Calendar Event
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ScheduleStats />

      {/* Calendar */}
      <Calendar />

      {/* Shift List */}
      <ShiftList />
    </div>
  );
}

export { SchedulingDetailsView };
