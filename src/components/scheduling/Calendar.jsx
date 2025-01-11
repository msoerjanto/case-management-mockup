import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { teamMembers } from "../../data/mockTeamData";

function Calendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate example shifts from team members
  const weeklyShifts = teamMembers.map((member, index) => ({
    id: member.id,
    name: member.name.split(' ')[0],
    shift: index % 2 === 0 ? 'Morning Shift (9AM - 5PM)' : 'Evening Shift (1PM - 9PM)',
    startDate: '2025-01-05',
    endDate: '2025-01-10',
    color: member.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
    index: index % 3
  }));

  // Original example shifts
  const exampleShifts = [
    {
      id: 1,
      name: 'John S.',
      shift: 'Morning Shift (9AM - 5PM)',
      startDate: '2025-01-05',
      endDate: '2025-01-10',
      color: 'bg-green-100 text-green-800',
      index: 0
     
    },
    {
      id: 2,
      name: 'Sarah M.',
      shift: 'Evening Shift (1PM - 9PM)',
      startDate: '2025-01-12', // Monday
      endDate: '2025-01-17',   // Friday
      color: 'bg-blue-100 text-blue-800',
      index: 0
    },
      {
        id: 3,
        name: 'Emma W.',
        shift: 'On Leave',
        startDate: '2025-01-05',
        endDate: '2025-01-08',
        color: 'bg-red-100 text-red-800 border border-red-200',
        type: 'leave',
        index: 1
      }
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
    const days = Array(35).fill(null).map((_, index) => {
      const dayNumber = index - firstDay + 1;
      if (dayNumber > 0 && dayNumber <= daysInMonth) {
        return {
          date: new Date(currentYear, currentDate.getMonth(), dayNumber),
          dayOfMonth: dayNumber
        };
      }
      return null;
    });
    return days;
  };

  // Check if a date has shifts
  const getShiftsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return weeklyShifts.filter(shift => 
      dateString >= shift.startDate && dateString <= shift.endDate
    );
  };

  // Check if it's the first day of a shift
  const isShiftStart = (date, shift) => {
    if (!date) return false;
    const dateString = date.toISOString().split('T')[0];
    return dateString === shift.startDate;
  };

  // Calculate shift width (in grid cells)
  const getShiftWidth = (date, shift) => {
    if (!date) return 1;
    const dateString = date.toISOString().split('T')[0];
    if (dateString !== shift.startDate) return 0;
    
    const start = new Date(shift.startDate);
    const end = new Date(shift.endDate);
    const dayDiff = Math.min(
      Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1,
      7 - start.getDay() // Don't extend beyond the current week
    );
    return dayDiff;
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">{`${currentMonth} ${currentYear}`}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Week</Button>
            <Button variant="outline">Month</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Day Headers */}
        {days.map((day) => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        
        {/* Calendar Cells */}
        {generateCalendarDays().map((dayData, index) => (
          <div 
            key={index}
            className="bg-white p-2 min-h-[160px] border-t relative group"
          >
            <div className="font-medium text-sm text-gray-500">
              {dayData?.dayOfMonth}
            </div>
            <div className="relative">
              {dayData && getShiftsForDate(dayData.date).map(shift => (
                isShiftStart(dayData.date, shift) && (
                  <div
                    key={shift.id}
                    className={`
                      absolute z-10 mt-1 px-2 py-1 rounded shadow-sm
                      hover:shadow transition-shadow duration-200
                      cursor-pointer truncate ${shift.color}
                    `}
                    style={{
                      width: `calc(${getShiftWidth(dayData.date, shift)} * 100% - 1rem)`,
                      top: `${shift.index * 28}px`, // Stack overlapping shifts
                      maxWidth: 'none'
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{shift.name}</span>
                      <span className="text-xs opacity-75">•</span>
                      <span className="text-xs truncate">{shift.shift}</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Calendar };
