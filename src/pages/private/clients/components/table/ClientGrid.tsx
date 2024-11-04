import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
import { Client } from "@/interfaces/client.interface";

interface Props {
  clients?: Client[];
}

function ClientGrid({ clients }: Props) {
  // const queryClient = useQueryClient();

  // const deleteClientMutation = useMutation({
  //   mutationFn: deleteClientById,
  //   mutationKey: ["deleteClient"],
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["clients"] });
  //     toast.success("Cliente eliminado correctamente");
  //   },
  //   onError: (error: Error) => {
  //     toast.error(error.message || "Error al eliminar el cliente");
  //   },
  // });

  // const handleDelete = (clientId: string) => {
  //   deleteClientMutation.mutate(clientId);
  // };  

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Edad</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients?.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.age}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell>
                {client.routines?.find((routine) => routine.day === "lunes") ? (
                  <span>Lunes</span>
                ) : (
                  <span>Sin rutina</span>
                )}
              </TableCell>
              <TableCell>
                {/* <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(client.id)}
                  disabled={deleteClientMutation.isPending}
                >
                  {deleteClientMutation.isPending ? "Eliminando..." : "Eliminar"}
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ClientGrid;
