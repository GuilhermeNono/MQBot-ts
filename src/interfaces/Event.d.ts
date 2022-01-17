import Client from "../Client/index";
import { ClientEvents } from "discord";

interface Run {
  (client: Client, ...args: any[]): Promise<unknown>;
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
