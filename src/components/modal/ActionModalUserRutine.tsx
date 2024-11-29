import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  children: (closeModal: () => void) => ReactNode;
  dialogTitle: string;
}

export function ActionModalUserRutine({ children, dialogTitle }: Props) {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/*titulo del modal interno */}
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {/*Pasar el  Formulario dentro del modal */}
        {typeof children === "function" ? children(closeModal) : children}
      </DialogContent>
    </Dialog>
  );
}
