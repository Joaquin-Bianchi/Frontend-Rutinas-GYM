import { Outlet } from "react-router-dom";

export function PrivateLayout() {
  return (
    <main>
      LAYOUT PRIVADO
      <Outlet />
    </main>
  );
}
