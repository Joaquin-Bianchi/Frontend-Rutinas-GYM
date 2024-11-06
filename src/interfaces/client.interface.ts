import { Role } from "@/enums/role.enum";
import { CategoryPlan } from "./categotyPlan.interface";
import { Routine } from "./routine.interface";

export interface Client {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: number;
  phoneEmergency: number;
  address: string;
  categoryPlans?: CategoryPlan[];
  role: Role;
  routines?: Routine[];
}
