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
  'TM-2024-002': {
    id: 'TM-2024-002',
    title: 'Structured Transaction Review',
    status: 'Under Review',
    priority: 'High',
    assignee: 'Irving Luntungan',
    createdAt: '2024-01-08T14:30:00',
    dueDate: '2024-01-10T18:00:00',
    description: 'Potential structured transactions identified across multiple accounts',
    type: 'Transaction Monitoring',
    customer: {
      name: 'Hendra Wijaya',
      email: 'hendra.wijaya@email.com',
      phone: '+62 813-9999-8888'
    },
    transactionDetails: {
      totalAmount: 'IDR 750,000,000',
      frequency: '8 transactions',
      timeWindow: '36 hours',
      unusualPattern: 'Structured transactions below reporting threshold'
    }
  },
  'CDD-2024-001': {
    id: 'CDD-2024-001',
    title: 'Enhanced Due Diligence Review',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Chrisanty Rea',
    createdAt: '2024-01-09T11:20:00',
    dueDate: '2024-01-12T18:00:00',
    description: 'Enhanced due diligence required for high-risk customer onboarding',
    type: 'Customer Due Diligence',
    customer: {
      name: 'PT Maju Bersama',
      email: 'contact@majubersama.co.id',
      phone: '+62 21-5555-6666'
    }
  },
  'CDD-2024-002': {
    id: 'CDD-2024-002',
    title: 'Periodic Review Assessment',
    status: 'Under Review',
    priority: 'Medium',
    assignee: 'Rudyanto S. Muharminto',
    createdAt: '2024-01-07T09:45:00',
    dueDate: '2024-01-11T18:00:00',
    description: 'Annual review of high-risk customer profile and activities',
    type: 'Customer Due Diligence',
    customer: {
      name: 'CV Sejahtera Abadi',
      email: 'info@sejahteraabadi.co.id',
      phone: '+62 21-7777-8888'
    }
  },
  'TM-2024-003': {
    id: 'TM-2024-003',
    title: 'Suspicious Transaction Pattern',
    status: 'New',
    priority: 'High',
    assignee: null,
    createdAt: '2024-01-10T08:00:00',
    dueDate: '2024-01-12T18:00:00',
    description: 'Multiple international wire transfers with unusual patterns',
    type: 'Transaction Monitoring',
    customer: {
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+62 812-3333-4444'
    },
    transactionDetails: {
      totalAmount: 'IDR 2,000,000,000',
      frequency: '12 transactions',
      timeWindow: '72 hours',
      unusualPattern: 'International transfers to multiple jurisdictions'
    }
  },
  'CDD-2024-003': {
    id: 'CDD-2024-003',
    title: 'Business Customer Verification',
    status: 'Rejected',
    priority: 'High',
    assignee: 'Isnaeni Zulkarnaen',
    createdAt: '2024-01-05T13:15:00',
    dueDate: '2024-01-09T18:00:00',
    description: 'Unable to verify ultimate beneficial ownership structure',
    type: 'Customer Due Diligence',
    customer: {
      name: 'PT Global Niaga',
      email: 'contact@globalniaga.co.id',
      phone: '+62 21-4444-5555'
    }
  },
  'TM-2024-004': {
    id: 'TM-2024-004',
    title: 'Cross-Border Transaction Review',
    status: 'Completed',
    priority: 'Medium',
    assignee: 'Marshelly Apriani',
    createdAt: '2024-01-06T10:30:00',
    dueDate: '2024-01-09T18:00:00',
    description: 'Review of large cross-border transactions with complete documentation',
    type: 'Transaction Monitoring',
    customer: {
      name: 'PT Indo Trading',
      email: 'finance@indotrading.co.id',
      phone: '+62 21-2222-3333'
    },
    transactionDetails: {
      totalAmount: 'IDR 3,500,000,000',
      frequency: '3 transactions',
      timeWindow: '48 hours',
      unusualPattern: 'Large cross-border transfers with verified documentation'
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
