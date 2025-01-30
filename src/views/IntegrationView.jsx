import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { IntegrationStats } from "../components/integrations/IntegrationStats";
import { IntegrationTabs } from "../components/integrations/IntegrationTabs";
import { IntegrationList } from "../components/integrations/IntegrationList";

function IntegrationsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Webhook
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Integration
          </Button>
        </div>
      </div>

      {/* Stats */}
      <IntegrationStats />

      {/* Tabs */}
      <IntegrationTabs />

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10" 
            placeholder="Search integrations..." 
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Integration List */}
      <IntegrationList />
    </div>
  );
}

export { IntegrationsView };