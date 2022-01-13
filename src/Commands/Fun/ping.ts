import ExtendedClient from "@Client";
import { Command } from "@Interface";
import { Timer, mTimer, CheckRole, Databases, EmbedTemplates } from "@Modules";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { connect } from "mongoose";

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
