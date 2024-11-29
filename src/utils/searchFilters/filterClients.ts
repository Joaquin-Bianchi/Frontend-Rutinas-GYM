import { Client } from "@/interfaces/client.interface";

export const filterClientsByName = (clients: Client[], searchText: string) => {
  return !clients
    ? []
    : clients.filter((client) =>
        client.name.toLowerCase().includes(searchText.toLowerCase())
      );
};
