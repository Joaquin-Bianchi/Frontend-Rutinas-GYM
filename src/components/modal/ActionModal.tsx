import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DumbbellIcon, Plus } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  title: string;
  dialogTitle: string;
}

export function ActionModal({ children, title, dialogTitle }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default">
          <Plus />
          {/*titulo del boton */}
          <p className="font-bold">{title}</p>
          <DumbbellIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/*titulo del modal interno */}
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {/*Pasar el  Formulario dentro del modal */}
        {children}
      </DialogContent>
    </Dialog>
  );
}
