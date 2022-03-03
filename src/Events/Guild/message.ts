import { Event, Command } from "../../interfaces/index.js";
import { CheckRole } from "../../../lib/modules/index";
import { Report } from "../Cycle/index";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import ExtendedClient from "../../Client/index";

export const event: Event = {
  name: "messageCreate",
  run: async (client: ExtendedClient, message: Message<boolean>) => {
    try {
      if (message.author.bot) return;

      let userKojj: User = client.users.cache.get("273322824318582785");
      let userCaiera: User = client.users.cache.get("429737792789282816");
      let userFelipe: User = client.users.cache.get("404299096967610370");

      if (
        message.content === `<@!${userKojj.id}>` ||
        message.content === `<@!${userCaiera.id}>` ||
        (message.content === `<@!${userFelipe.id}>` && message.deletable)
      ) {
        let memberGuild: GuildMember = message.guild.members.cache.get(
          message.author.id
        );
        const newCheckAuthor: CheckRole = new CheckRole(client, memberGuild);
        if (!newCheckAuthor.CheckHighRoleBool()) message.delete();
      }

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

      const cmd: string | undefined = args?.shift()?.toLowerCase();
      if (!cmd) return;
      const command: Command | undefined =
        client.commands.get(cmd) || client.aliases.get(cmd);
      if (!command) return;
      if (command) (command as Command).run(client, message, args);
    } catch (error) {}
  },
};
