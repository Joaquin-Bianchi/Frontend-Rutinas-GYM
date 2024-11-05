import ButtonDelete from "@/components/buttons/ButtonDelete";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Client } from "@/interfaces/client.interface";
import { deleteClientById } from "@/services/clientService";
import { Ellipsis } from "lucide-react";

interface Props {
  clients?: Client[];
}

function ClientGrid({ clients }: Props) {
  
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
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients?.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
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
                <Popover>
                  <PopoverTrigger className="ml-auto mr-2" asChild>
                    <Ellipsis className="cursor-pointer" />
                  </PopoverTrigger>

                  <PopoverContent className="w-full">
                    <div className="items-end flex gap-1">
                      <ButtonDelete
                        id={client.id}
                        deleteFn={deleteClientById}
                        nameMutationKey="deleteClient"
                        nameQueryKey="clients"
                        textObjectDelete="cliente"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ClientGrid;
