function WorkflowStats() {
    const stats = [
      { title: 'Active Workflows', value: '8', color: 'text-green-600' },
      { title: 'Total States', value: '32', color: 'text-gray-900' },
      { title: 'Cases In Progress', value: '156', color: 'text-blue-600' },
      { title: 'Completed Today', value: '47', color: 'text-gray-900' }
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
  
  export { WorkflowStats };