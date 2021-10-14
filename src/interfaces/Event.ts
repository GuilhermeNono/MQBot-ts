import Client from "../Client";
import { ClientEvents } from "discord.js";

interface Run {
    (client: Client, ...args: string[]): Promise<unknown>
}

export interface Event {
    name: keyof ClientEvents;
    run: Run;
}