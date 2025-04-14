
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, User } from "@/types/task";
import { FilterIcon } from "lucide-react";

interface TaskFiltersProps {
  users: User[];
  buildings: Building[];
  selectedUserId: string | null;
  selectedBuildingId: string | null;
  onUserChange: (userId: string | null) => void;
  onBuildingChange: (buildingId: string | null) => void;
  onClearFilters: () => void;
}

export function TaskFilters({
  users,
  buildings,
  selectedUserId,
  selectedBuildingId,
  onUserChange,
  onBuildingChange,
  onClearFilters,
}: TaskFiltersProps) {
  const handleUserChange = (value: string) => {
    onUserChange(value === "all" ? null : value);
  };

  const handleBuildingChange = (value: string) => {
    onBuildingChange(value === "all" ? null : value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1 min-w-[150px]">
        <Select
          value={selectedUserId || "all"}
          onValueChange={handleUserChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 min-w-[150px]">
        <Select
          value={selectedBuildingId || "all"}
          onValueChange={handleBuildingChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by building" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Buildings</SelectItem>
            {buildings.map((building) => (
              <SelectItem key={building.id} value={building.id}>
                {building.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={onClearFilters}
        disabled={!selectedUserId && !selectedBuildingId}
      >
        <FilterIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
