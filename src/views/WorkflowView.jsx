import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, Filter } from "lucide-react";
import { WorkflowStats } from "../components/workflows/WorkflowStats";
import { WorkflowList } from "../components/workflows/WorkflowList";

function WorkflowView({ onCreateNew }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Workflows</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onCreateNew}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Stats */}
      <WorkflowStats />

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            className="pl-10" 
            placeholder="Search workflows..." 
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Workflow List */}
      <WorkflowList onEdit={(id) => console.log('Edit workflow:', id)} />
    </div>
  );
}

export { WorkflowView };