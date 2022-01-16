import Client from "../Client/index.js";
import { ClientEvents } from "discord.js";

interface Run {
  (client: Client, ...args: any[]): Promise<unknown>;
}

export interface Event {
  name: keyof ClientEvents;
  run: Run;
}
