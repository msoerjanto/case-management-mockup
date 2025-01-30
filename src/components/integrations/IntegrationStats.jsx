function IntegrationStats() {
    const stats = [
      { title: 'Active Integrations', value: '12', color: 'text-green-600' },
      { title: 'API Calls Today', value: '2.4K', color: 'text-gray-900' },
      { title: 'Active Webhooks', value: '8', color: 'text-blue-600' },
      { title: 'Failed Callbacks', value: '3', color: 'text-red-600' }
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
  
  export { IntegrationStats };