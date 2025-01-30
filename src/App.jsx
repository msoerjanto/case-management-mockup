import React, { useState } from 'react';
import { CasesView } from './views/CasesView';
import { Sidebar } from './components/layout/Sidebar';
import { TeamView } from './views/TeamView';
import { SchedulingView } from './views/SchedulingView';
import { WorkflowView } from './views/WorkflowView';
import { IntegrationsView } from './views/IntegrationView';
import { CreateWorkflowView } from './views/CreateWorkflowView';
import { CaseDetails } from './components/cases/CaseDetails';
import { SLAView } from './views/SLAView';
import { SettingsView } from './views/SettingsView';
import { TeamDetailsView } from './views/TeamDetailsView';

function App() {
  const [activeView, setActiveView] = useState('cases');
  const [subView, setSubView] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null); // Add this
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  // Handle Workflow Create view
  if (activeView === 'workflows' && subView === 'create') {
    return <CreateWorkflowView onBack={() => setSubView(null)} />;
  }

  // Handle case details view
  if (activeView === 'cases' && subView === 'details') {
    return <CaseDetails onBack={() => setSubView(null)} />;
  }

  // Handle team details view
  if (activeView === 'team' && subView === 'details') {
    return (
      <TeamDetailsView 
        teamId={selectedTeamId}
        onBack={() => {
          setSubView(null);
          setSelectedTeamId(null);
        }}
      />
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'cases':
        return <CasesView onCaseClick={(caseId) => {
          setSelectedCaseId(caseId);
          setSubView('details');
        }}/>
      case 'team':
        return <TeamView 
        onTeamClick={(teamId) => {
          setSelectedTeamId(teamId);
          setSubView('details');
        }}
      />;
      case 'scheduling':
        return <SchedulingView />;
      case 'workflows':
        return <WorkflowView onCreateNew={() => setSubView('create')} />;
      case 'integrations':
          return <IntegrationsView />;
      case 'sla':
          return <SLAView />;
      case 'settings':
          return <SettingsView />;
      default:
        return <CasesView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default App;