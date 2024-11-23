import ButtonDelete from "@/components/buttons/ButtonDelete";
import { ActionModal } from "@/components/modal/ActionModal";
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
import EditClientForm from "../forms/EditClientForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  clients?: Client[];
}

function ClientGrid({ clients }: Props) {
  console.log(clients);
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
            <TableCell>Rutinas</TableCell>
            <TableHead className="text-right"></TableHead>
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
                {client.categoryPlans?.map((category) => (
                  <span
                    key={category.id}
                    className="mx-1 bg-secondary rounded px-1 py-0.5"
                  >
                    {category}
                  </span>
                ))}
              </TableCell>
              <TableCell>
                <Link
                  to={`/dashboard/client/routine/${client.id}`}
                  className="flex items-center space-x-2"
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="font-semibold"
                  >
                    Ver
                  </Button>
                </Link>
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
                        textObjectDelete="Cliente"
                      />
                      <ActionModal title="Editar" dialogTitle="Editar Cliente">
                        <EditClientForm client={client} />
                      </ActionModal>
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
