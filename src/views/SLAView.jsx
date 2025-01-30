import React, { useState } from 'react';
import { Bell, Clock, AlertTriangle, Plus, Search, Filter, ArrowUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

function SLAView() {
  const [activeTab, setActiveTab] = useState('alerts');

  const alerts = [
    {
      id: 1,
      caseId: 'CS-2024-001',
      title: 'Account Verification Issue',
      type: 'SLA Breach',
      priority: 'High',
      timeRemaining: 'Breached 2h ago',
      assignee: 'John Smith',
      status: 'critical'
    },
    {
      id: 2,
      caseId: 'CS-2024-003',
      title: 'Payment Processing Error',
      type: 'SLA Warning',
      priority: 'Medium',
      timeRemaining: '1h remaining',
      assignee: 'Sarah Johnson',
      status: 'warning'
    }
  ];

  const slaRules = [
    {
      id: 1,
      name: 'Standard Response Time',
      caseType: 'General Inquiry',
      priority: 'Normal',
      duration: '24 hours',
      status: 'Active'
    },
    {
      id: 2,
      name: 'High Priority Resolution',
      caseType: 'Technical Issue',
      priority: 'High',
      duration: '4 hours',
      status: 'Active'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">SLA & Alerts</h1>
          <p className="text-gray-500 mt-1">Manage service level agreements and monitor alerts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create SLA Rule
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Active Alerts</div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Bell className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-red-600 flex items-center mt-1">
              <ArrowUp className="w-3 h-3 mr-1" />
              4 new since yesterday
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">SLA Breaches Today</div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-500 mt-1">
              89% compliance rate
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Cases At Risk</div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">7</div>
            <div className="text-sm text-gray-500 mt-1">
              Due within 2 hours
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">Active SLA Rules</div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-gray-500 mt-1">
              Across 5 case types
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'alerts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Active Alerts
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rules'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            SLA Rules
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10" 
            placeholder={activeTab === 'alerts' ? "Search alerts..." : "Search SLA rules..."} 
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'alerts' ? (
        <div className="bg-white rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{alert.caseId}</div>
                    <div className="text-sm text-gray-500">{alert.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {alert.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {alert.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className={alert.status === 'critical' ? 'text-red-600' : 'text-yellow-600'}>
                      {alert.timeRemaining}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{alert.assignee}</td>
                  <td className="px-6 py-4 text-sm">
                    <Button variant="ghost" size="sm">View Case</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rule Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {slaRules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-6 py-4 text-sm font-medium">{rule.name}</td>
                  <td className="px-6 py-4 text-sm">{rule.caseType}</td>
                  <td className="px-6 py-4 text-sm">{rule.priority}</td>
                  <td className="px-6 py-4 text-sm">{rule.duration}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export { SLAView };