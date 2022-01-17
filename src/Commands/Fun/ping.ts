import ExtendedClient from "../../Client/index";
import { Command } from "../../interfaces/index"
import { Message } from "discord.js";

export const command: Command = {
  name: "ping",
  aliases: ["pg"],
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      return message.channel.send("pong🏓");
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
