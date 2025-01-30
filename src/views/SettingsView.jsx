import { useState } from 'react';
import { 
  Layout, 
  Users, 
  Bell, 
  Shield, 
  Tag,
  Mail,
  Database,
  Workflow,
  Search
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

function SettingsView() {
  const [activeSection, setActiveSection] = useState('general');

  const settingsSections = [
    { id: 'general', name: 'General Settings', icon: Layout },
    { id: 'case-types', name: 'Case Types', icon: Tag },
    { id: 'custom-fields', name: 'Custom Fields', icon: Database },
    { id: 'workflows', name: 'Workflow Settings', icon: Workflow },
    { id: 'team', name: 'Team & Permissions', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email Templates', icon: Mail },
  ];

  // At the top of your SettingsView component, add the caseTypes state
    const [caseTypes, setCaseTypes] = useState([
        {
        id: 1,
        name: 'Technical Support',
        description: 'For technical issues and bug reports',
        teams: [
            {
            id: 1,
            name: 'Technical Support Team',
            assignedRoles: ['Support Engineer', 'Senior Engineer']
            },
            {
            id: 2,
            name: 'Customer Success',
            assignedRoles: ['Support Agent']
            }
        ]
        },
        {
        id: 2,
        name: 'Account Issues',
        description: 'For account-related inquiries and problems',
        teams: [
            {
            id: 3,
            name: 'Account Management',
            assignedRoles: ['Account Manager', 'Support Agent']
            }
        ]
        },
        {
        id: 3,
        name: 'Billing Support',
        description: 'For billing and payment issues',
        teams: [
            {
            id: 4,
            name: 'Billing Team',
            assignedRoles: ['Billing Specialist', 'Finance Agent']
            }
        ]
        }
    ]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your case management system settings</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg border">
            <div className="p-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md 
                    ${activeSection === section.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div>
                <div className="border-b px-6 py-4">
                  <h2 className="text-lg font-medium">General Settings</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="max-w-xl">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organization Name
                        </label>
                        <Input placeholder="Enter organization name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Default Time Zone
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                          <option>UTC</option>
                          <option>Eastern Time</option>
                          <option>Pacific Time</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date Format
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Case Types Settings */}
            {activeSection === 'case-types' && (
            <div>
                <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium">Case Types</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Case Type
                </Button>
                </div>
                <div className="p-6">
                <div className="space-y-4">
                    <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input className="pl-10" placeholder="Search case types..." />
                    </div>
                    </div>
                    <div className="border rounded-lg divide-y">
                    {caseTypes.map(caseType => (
                        <div key={caseType.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                            <div className="font-medium">{caseType.name}</div>
                            <div className="text-sm text-gray-500">{caseType.description}</div>
                            </div>
                            <Button variant="ghost">Edit</Button>
                        </div>
                        
                        {/* Team Assignments */}
                        <div className="ml-4 space-y-2">
                            <div className="text-sm font-medium text-gray-700">Assigned Teams</div>
                            <div className="flex flex-wrap gap-2">
                            {caseType.teams.map(team => (
                                <div key={team.id} 
                                className="inline-flex items-center px-3 py-1 rounded-full 
                                    bg-blue-50 text-blue-700 text-sm"
                                >
                                {team.name}
                                <span className="text-xs text-gray-500 ml-2">
                                    ({team.assignedRoles.length} roles)
                                </span>
                                </div>
                            ))}
                            <Button 
                                variant="outline" 
                                size="sm"
                                className="rounded-full"
                            >
                                Assign Team
                            </Button>
                            </div>
                        </div>

                        {/* Role Assignments per Team */}
                        <div className="ml-4 mt-4">
                            <div className="text-sm font-medium text-gray-700 mb-2">Team Role Assignments</div>
                            <div className="space-y-2">
                            {caseType.teams.map(team => (
                                <div key={team.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div className="text-sm">{team.name}</div>
                                <div className="flex items-center gap-2">
                                    <div className="text-sm text-gray-500">
                                    Roles: {team.assignedRoles.join(', ')}
                                    </div>
                                    <Button variant="ghost" size="sm">Edit Roles</Button>
                                </div>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Custom Fields Settings */}
            {activeSection === 'custom-fields' && (
              <div>
                <div className="border-b px-6 py-4 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Custom Fields</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Field
                  </Button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input className="pl-10" placeholder="Search fields..." />
                      </div>
                    </div>
                    <div className="border rounded-lg divide-y">
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Customer ID</div>
                          <div className="text-sm text-gray-500">Text Field • Required</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Product Version</div>
                          <div className="text-sm text-gray-500">Dropdown • Optional</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-medium">Issue Category</div>
                          <div className="text-sm text-gray-500">Multi-select • Required</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Workflow Settings */}
            {activeSection === 'workflows' && (
            <div>
                <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium">Workflow Settings</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    Configure Workflow
                </Button>
                </div>
                <div className="p-6">
                <div className="space-y-6">
                    {/* Default Workflow */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Default Workflow Settings</h3>
                    <div className="max-w-xl space-y-4">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Default State
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                            <option>New</option>
                            <option>Open</option>
                            <option>In Progress</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Auto-assignment
                        </label>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-600">Enable automatic case assignment</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* State Transitions */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">State Transitions</h3>
                    <div className="border rounded-lg divide-y">
                        <div className="p-4 flex items-center justify-between">
                        <div>
                            <div className="font-medium">New → In Progress</div>
                            <div className="text-sm text-gray-500">Requires assignment</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                        <div>
                            <div className="font-medium">In Progress → Resolved</div>
                            <div className="text-sm text-gray-500">Requires resolution code</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Team & Permissions Settings */}
            {activeSection === 'team' && (
            <div>
                <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium">Team & Permissions</h2>
                <div className="flex gap-2">
                    <Button variant="outline">Manage Roles</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                    Add Team Member
                    </Button>
                </div>
                </div>
                <div className="p-6">
                <div className="space-y-6">
                    {/* Role Management */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Roles</h3>
                    <div className="border rounded-lg divide-y">
                        <div className="p-4 flex items-center justify-between">
                        <div>
                            <div className="font-medium">Administrator</div>
                            <div className="text-sm text-gray-500">Full system access</div>
                        </div>
                        <Button variant="ghost">Edit Permissions</Button>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                        <div>
                            <div className="font-medium">Team Leader</div>
                            <div className="text-sm text-gray-500">Team management and reporting</div>
                        </div>
                        <Button variant="ghost">Edit Permissions</Button>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                        <div>
                            <div className="font-medium">Agent</div>
                            <div className="text-sm text-gray-500">Case handling and updates</div>
                        </div>
                        <Button variant="ghost">Edit Permissions</Button>
                        </div>
                    </div>
                    </div>

                    {/* Access Control */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Access Control</h3>
                    <div className="max-w-xl space-y-4">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Case Visibility
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                            <option>Team-based</option>
                            <option>Department-based</option>
                            <option>Global</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data Access Level
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                            <option>Standard</option>
                            <option>Restricted</option>
                            <option>Confidential</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
            <div>
                <div className="border-b px-6 py-4">
                <h2 className="text-lg font-medium">Notification Settings</h2>
                </div>
                <div className="p-6">
                <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                    <div className="max-w-xl space-y-4">
                        <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Case Assignment</div>
                            <div className="text-sm text-gray-500">When a case is assigned to you</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" checked />
                        </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">SLA Breaches</div>
                            <div className="text-sm text-gray-500">When a case breaches SLA</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" checked />
                        </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Case Updates</div>
                            <div className="text-sm text-gray-500">When a case is updated</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" checked />
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* In-App Notifications */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">In-App Notifications</h3>
                    <div className="max-w-xl space-y-4">
                        <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Case Comments</div>
                            <div className="text-sm text-gray-500">When someone comments on your case</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" checked />
                        </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                        <div>
                            <div className="font-medium">Mentions</div>
                            <div className="text-sm text-gray-500">When someone mentions you</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" checked />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Security Settings */}
            {activeSection === 'security' && (
            <div>
                <div className="border-b px-6 py-4">
                <h2 className="text-lg font-medium">Security Settings</h2>
                </div>
                <div className="p-6">
                <div className="space-y-6">
                    {/* Authentication */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Authentication</h3>
                    <div className="max-w-xl space-y-4">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password Policy
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                            <option>Standard</option>
                            <option>Strong</option>
                            <option>Custom</option>
                        </select>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Two-Factor Authentication
                        </label>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-600">Require 2FA for all users</span>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Session Management */}
                    <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Session Management</h3>
                    <div className="max-w-xl space-y-4">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Session Timeout
                        </label>
                        <select className="w-full rounded-md border border-gray-300 p-2 text-sm">
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>4 hours</option>
                        </select>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Email Templates */}
            {activeSection === 'email' && (
            <div>
                <div className="border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium">Email Templates</h2>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Template
                </Button>
                </div>
                <div className="p-6">
                <div className="space-y-6">
                    <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input className="pl-10" placeholder="Search templates..." />
                    </div>
                    </div>
                    <div className="border rounded-lg divide-y">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                        <div className="font-medium">Case Created</div>
                        <div className="text-sm text-gray-500">Sent when a new case is created</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                        <div className="font-medium">Case Updated</div>
                        <div className="text-sm text-gray-500">Sent when a case is updated</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                        <div className="font-medium">Case Resolved</div>
                        <div className="text-sm text-gray-500">Sent when a case is resolved</div>
                        </div>
                        <Button variant="ghost">Edit</Button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { SettingsView };