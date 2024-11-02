import { Search } from "lucide-react";
import { Input } from "../ui/input";

function SearchInput() {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Nombre del ejercicio..." className="pl-10" />
    </div>
  );
}

export default SearchInput;
