import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Settings } from "lucide-react";

function TeamSearch() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          className="pl-10" 
          placeholder="Search team members..." 
        />
      </div>
      <Button variant="outline">
        <Settings className="w-4 h-4 mr-2" />
        Team Settings
      </Button>
    </div>
  );
}

export { TeamSearch };