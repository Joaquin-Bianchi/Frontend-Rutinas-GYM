import { Navbar } from "@/components/navigation/Navbar";
import { Outlet } from "react-router-dom";

export function PrivateLayout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
