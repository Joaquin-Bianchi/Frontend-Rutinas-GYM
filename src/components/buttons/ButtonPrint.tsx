import { Printer } from "lucide-react";
import { Button } from "../ui/button";


export default function ButtonPrint() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handlePrint}
      className="mr-2"
    >
      <Printer className="h-4 w-4" />
    </Button>
  );
}
