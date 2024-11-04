import { CategoryPlan } from "./categotyPlan.interface";
import { Routine } from "./routine.interface";

export interface User {
  name: string;
  age: number;
  email: string;
  phone: number;
  phoneEmergency: number;
  address: string;
  categoryPlan?: CategoryPlan[];
  role: "ADMIN" | "CLIENT" | "COACH";
  routines?: Routine[];
}
