import { Role } from "@/enums/role.enum";
import { CategoryPlan } from "./categotyPlay.interface";
import { Routine } from "./routine.interface";

export interface Client {
  id: string;
  name: string;
  age: number;
  phone: number;
  phoneEmergency: number;
  address: string;
  categoryPlan?: CategoryPlan[];
  role: Role;
  routines?: Routine[];
}
