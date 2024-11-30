import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useContext, useEffect } from "react";
import { SearchContext } from "@/context/SearchContext";

function SearchInput() {
  
  useEffect(() => {
    setSearchText("");
  }, []);

  const { searchText, setSearchText } = useContext(SearchContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar..."
        className="pl-10"
        value={searchText}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchInput;
