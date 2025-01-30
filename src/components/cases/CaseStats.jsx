import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function CaseStats() {
  const stats = [
    { title: 'My Cases', value: '24', color: 'text-gray-900' },
    { title: 'Team Cases', value: '156', color: 'text-gray-900' },
    { title: 'SLA Breached', value: '3', color: 'text-red-600' },
    { title: 'Due Today', value: '7', color: 'text-orange-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}