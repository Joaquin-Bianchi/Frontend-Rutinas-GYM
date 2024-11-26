import { toast } from "sonner";

export const handlerError = (error: any) => {
  const errorZod = error.response?.data[0]?.message;
  const errorBD = error.response?.data?.error;

  if (errorZod) {
    toast.error(errorZod);
    return;
  }

  if (errorBD) {
    toast.error(errorBD);
    return;
  }

  toast.error("Ups! Intentelo de nuevo más tarde");
};
