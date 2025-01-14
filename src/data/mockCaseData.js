export const mockCases = {
  'TM-2024-001': {
    id: 'TM-2024-001',
    title: 'High Value Transaction Alert',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Balgis Harris',
    createdAt: '2024-01-09T10:00:00',
    dueDate: '2024-01-11T18:00:00',
    description: 'Multiple high-value transactions detected within 24 hours',
    type: 'Transaction Monitoring',
    customer: {
      name: 'Bambang Suryanto',
      email: 'bambang.suryanto@gmail.com',
      phone: '+62 812-8888-9999'
    },
    transactionDetails: {
      totalAmount: 'IDR 1,500,000,000',
      frequency: '5 transactions',
      timeWindow: '24 hours',
      unusualPattern: 'Multiple cross-border transfers'
    }
  },
  'TM-2024-005': {
    id: 'TM-2024-005',
    title: 'Multiple Transactions Pattern Alert',
    status: 'New',
    priority: 'High',
    assignee: 'Syaadilla Rahma',
    createdAt: '2024-01-10T09:15:00',
    dueDate: '2024-01-12T18:00:00',
    description: 'Unusual pattern of small transactions detected',
    type: 'Transaction Monitoring',
    customer: {
      name: 'Dewi Kartika',
      email: 'dewi.kartika@email.com',
      phone: '+62 821-7777-8888'
    },
    transactionDetails: {
      totalAmount: 'IDR 250,000,000',
      frequency: '25 transactions',
      timeWindow: '48 hours',
      unusualPattern: 'Multiple small transactions to different recipients'
    }
  }
};
