import Client from "@Client";
import { Message } from "discord.js";

interface Run {
  (client: Client, message: Message, args: string[]): Promise<unknown>;
}

export interface Command {
  name: string;
  description?: string;
  aliases?: string[];
  run: Run;
}
