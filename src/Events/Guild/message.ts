import { Event, Command } from "../../interfaces/index.js";
import { CheckRole } from "../../../lib/modules/index";
import { Report, levelCheck} from "../Cycle/index";
import {
  Guild,
  GuildBasedChannel,
  GuildMember,
  Message,
  MessageEmbed,
  User,
} from "discord.js";
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

      //#region DEPRECATED
      // // if (message.content.includes("@everyone")) {
      // //   let memberGuild: GuildMember = message.guild.members.cache.get(
      // //     message.author.id
      // //   );
      // //   let verification = new CheckRole(
      // //     client,
      // //     memberGuild
      // //   ).CheckHighRoleBool();
      // //   if (!verification) {
      // //     let guild: Guild = message.guild;
      // //     if (guild.id != "715957077939454079") return;
      // //     let channel: GuildBasedChannel =
      // //       guild.channels.cache.get("846277251351052308");
      // //     if (!channel) return;
      // //     if (channel.type === "GUILD_TEXT") {
      // //       let embedWaning = new MessageEmbed()
      // //         .setTitle("⚠️Possivel Inflação detectada.⚠️")
      // //         .setColor("#ab3018")
      // //         .setDescription(
      // //           `Foi detectado uma possivel tentativa de phising pelo usuario **${message.member.user.tag}**, .`
      // //         )
      // //         .addField(
      // //           `Conteudo da mensagem -> ${message.content}`,
      // //           "<@&731199687981400097>"
      // //         )
      // //         .setFooter(
      // //           {text:`ID do usuario: ${message.member.id}`,
      // //           iconURL:"https://media.discordapp.net/attachments/776094611470942208/846246640867737610/peach_san.png?width=701&height=701"}
      // //         );
      // //       return channel.send({ embeds: [embedWaning] }).then(() => {
      // //         if (message.deletable) {
      // //           message.delete();
      // //         }
      // //       });
      // //     }
      // //   }
      // // }
      //#endregion
      
      Report(message, client);

      await levelCheck(message);

      if (
        message.author.bot ||
        !message.guild ||
        !message.content.startsWith(process?.env["BOT_PREFIX"])
      )
        return;

      const embedIsNotOfficialServer: MessageEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`💢 Bot exclusivo do servidor "Brioco" 💢`);

      if (message.guild.id !== process.env.GUILD_ID_BRIOCO)
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
