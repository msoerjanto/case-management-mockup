function ScheduleStats() {
    const stats = [
      { title: 'On Duty Today', value: '12', color: 'text-gray-900' },
      { title: 'On Leave', value: '3', color: 'text-orange-600' },
      { title: 'Total Shifts', value: '48', color: 'text-gray-900' },
      { title: 'Pending Requests', value: '5', color: 'text-blue-600' }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border p-6">
            <div className="text-sm font-medium text-gray-500">
              {stat.title}
            </div>
            <div className={`text-2xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export { ScheduleStats };