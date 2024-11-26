import { Role } from "@/enums/role.enum";
import { Routine } from "./routine.interface";

export interface Client {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: number;
  phoneEmergency: number;
  address: string;
  categoryPlans?: string[];
  role: Role;
  routines?: Routine[];
}
