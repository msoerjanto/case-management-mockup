import React, { useState } from 'react';
import { 
  Briefcase, 
  List, 
  Users, 
  Calendar, 
  GitBranch, 
  Bell, 
  Link2,
  BarChart,
  Settings,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export function Sidebar({ activeView, setActiveView }) {
  const [showAdvancedMenu, setShowAdvancedMenu] = useState(false);

  const futureFeatures = [
    {
      id: 'integrations',
      label: 'Integrations',
      icon: <Link2 className="w-4 h-4 mr-2" />,
      view: 'integrations'
    }
  ];
  return (
    <div className="w-64 h-screen bg-white border-r flex-shrink-0 overflow-y-auto">
      <div className="p-4">
        <div className="font-semibold text-lg mb-4">Modules</div>
        <div className="space-y-2">
          <div className="flex items-center p-2 bg-blue-50 rounded">
            <Briefcase className="w-5 h-5 mr-2" />
            <span className="font-medium">Case Management</span>
          </div>
          <div className="ml-7 space-y-1">
            <div 
              className={`p-2 rounded cursor-pointer ${activeView === 'cases' ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveView('cases')}
            >
              <div className="flex items-center text-sm">
                <List className="w-4 h-4 mr-2" />
                Cases
              </div>
            </div>

            <div 
              className={`p-2 rounded cursor-pointer ${activeView === 'team' ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveView('team')}
            >
              <div className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2" />
                Team Management
              </div>
            </div>

            <div 
              className={`p-2 rounded cursor-pointer ${activeView === 'scheduling' ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveView('scheduling')}
            >
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                Scheduling
              </div>
            </div>

            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                 onClick={() => setActiveView('workflows')}
            >
              <div className="flex items-center text-sm">
                <GitBranch className="w-4 h-4 mr-2" />
                Workflows
              </div>
            </div>

            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
              <div className="flex items-center text-sm">
                <BarChart className="w-4 h-4 mr-2" />
                Reports
              </div>
            </div>

            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                 onClick={() => setActiveView('sla')}
            >
              <div className="flex items-center text-sm">
                <Bell className="w-4 h-4 mr-2" />
                SLA & Alerts
              </div>
            </div>

            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => setActiveView('settings')}
            >
              <div className="flex items-center text-sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Menu Toggle */}
      <div className="border-t pt-4 mt-auto">
        <button
          className="w-full p-2 hover:bg-gray-100 rounded flex items-center justify-between text-sm"
          onClick={() => setShowAdvancedMenu(!showAdvancedMenu)}
        >
          <span className="font-medium">Future Features</span>
          {showAdvancedMenu ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Advanced Menu Items */}
        {showAdvancedMenu && (
          <div className="mt-2 space-y-1">
            {futureFeatures.map(item => (
              <div
                key={item.id}
                className={`p-2 rounded cursor-pointer ${
                  activeView === item.view ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveView(item.view)}
              >
                <div className="flex items-center text-sm">
                  {item.icon}
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
