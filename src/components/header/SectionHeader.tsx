import { ReactNode } from "react";
import SearchInput from "../search/SearchInput";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  createButton: ReactNode;
}

function SectionHeader({ title, createButton }: Props) {
  return (
    <>
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-primary">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <SearchInput />
              {createButton}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SectionHeader;
