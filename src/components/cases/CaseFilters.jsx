import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export function CaseFilters() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          className="pl-10" 
          placeholder="Search cases..." 
        />
      </div>
      <Button variant="outline">
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>
    </div>
  );
}