import Client from "../Client/index";
import { Message } from "discord.js";

interface Run {
  (client: Client, message: Message, args: string[]): Promise<unknown>;
}

export interface Command {
  name: string;
  isOff?: boolean;
  description?: string;
  aliases?: string[];
  run: Run;
}
