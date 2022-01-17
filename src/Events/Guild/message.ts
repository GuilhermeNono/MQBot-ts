import { Event, Command } from "../../interfaces/index.js";
import { Report } from "../Cycle/index";
import { Message, MessageEmbed } from "discord.js";
import ExtendedClient from "../../Client/index";

export const event: Event = {
  name: "messageCreate",
  run: async (client:ExtendedClient, message: Message<boolean>) => {
    try {
      if (message.author.bot) return;

      Report(message, client);

      if (
        message.author.bot ||
        !message.guild ||
        !message.content.startsWith(process?.env["BOT_PREFIX"])
      )
        return;

      const embedIsNotOfficialServer: MessageEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`💢 Bot exclusivo do servidor "Brioco" 💢`);

      if (message.guild.id !== "929417995325956177")  
        return message.channel.send({ embeds: [embedIsNotOfficialServer] });

      const args = message?.content
        .slice(process.env["BOT_PREFIX"]?.length)
        .trim()
        .split(/ +/g);

      const cmd: string | undefined= args?.shift()?.toLowerCase();
      if (!cmd) return;
      const command: Command | undefined=
        client.commands.get(cmd) || client.aliases.get(cmd);
        if(!command) return
      if (command) (command as Command).run(client, message, args);
    } catch (error) {}
  },
};
