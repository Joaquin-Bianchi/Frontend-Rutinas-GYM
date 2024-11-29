import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SearchContextType {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType>({
  searchText: "",
  setSearchText: () => {},
});

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};
