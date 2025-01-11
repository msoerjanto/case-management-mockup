import { Button } from "../components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { ScheduleStats } from "../components/scheduling/ScheduleStats";
import { Calendar } from "../components/scheduling/Calendar";
import { ShiftList } from "../components/scheduling/ShiftList";

function SchedulingView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Team Scheduling</h1>
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

export { SchedulingView };