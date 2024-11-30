import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  children: (closeModal: () => void) => ReactNode;
  title: string;
  dialogTitle: string;
  showIcon?: boolean;
}

export function ActionModal({ children, title, dialogTitle, showIcon = false }: Props) {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default">
          {showIcon && <Plus />}
          {/*titulo del boton */}
          <p className="font-bold">{title}</p>
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
