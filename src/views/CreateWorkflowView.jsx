import { Button } from "../components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { WorkflowDesigner } from "../components/workflows/WorkflowDesigner";

function CreateWorkflowView({ onBack }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Create Workflow</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save & Activate
          </Button>
        </div>
      </div>

      {/* Workflow Designer */}
      <WorkflowDesigner />
    </div>
  );
}

export { CreateWorkflowView };