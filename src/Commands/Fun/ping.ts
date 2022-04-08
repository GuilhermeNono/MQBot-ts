import ExtendedClient from "../../Client/index";
import { Command } from "../../interfaces/index";
import { Message, MessageEmbed } from "discord.js";

export const command: Command = {
  name: "ping",
  aliases: ["pg"],
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      message.channel.send("pong🏓");
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
