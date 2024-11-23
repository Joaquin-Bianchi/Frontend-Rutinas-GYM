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
import { deleteClientById } from "@/services/clientService";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";

interface Props {
  plans?: CategoryPlan[];
}

function CategoryPlanGrid({ plans }: Props) {
  console.log(plans);
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans?.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell className="font-medium">{plan.name}</TableCell>
              {/* <TableCell>
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
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryPlanGrid;
