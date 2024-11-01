import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

function SearchInput() {
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary">Buscar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Nombre del ejercicio..." className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SearchInput;
