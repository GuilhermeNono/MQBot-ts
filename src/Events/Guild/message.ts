import { Event, Command } from "../../interfaces/index.js";
import { CheckRole, Databases } from "../../../lib/modules/index";
import { Report, levelCheck } from "../Cycle/index";
import {
  Guild,
  GuildBasedChannel,
  GuildMember,
  Message,
  MessageEmbed,
  User,
} from "discord.js";
import ExtendedClient from "../../Client/index";
import { GuildDataModel } from "../../../models/index";

export const event: Event = {
  name: "messageCreate",
  run: async (client: ExtendedClient, message: Message<boolean>) => {
    try {
      const embedIsNotOfficialServer: MessageEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`💢 Bot exclusivo do servidor "Brioco" e autorizados. 💢`)
        .setFooter({
          text: `Contate o Desenvolvedor para mais informações. ➟ ${
            client.users.cache.get("261945904829956097").tag
          }`,
        });

      if (message.author.bot) return;

      if (message.guild.id === "929417995325956177") {
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

      // await levelCheck(message);

      if (
        message.author.bot ||
        !message.content.startsWith(process?.env["BOT_PREFIX"])
      )
        return;

      const args = message?.content
        .slice(process.env["BOT_PREFIX"]?.length)
        .trim()
        .split(/ +/g);

      const cmd: string | undefined = args?.shift()?.toLowerCase();
      if (!cmd) return;
      const command: Command | undefined =
        client.commands.get(cmd) || client.aliases.get(cmd);

      let guildDB = await GuildDataModel.findOne({
        guildID: message.guildId,
      }).exec();

      if (!guildDB) {
        await new Databases().GuildData(message.guildId, message.guild.ownerId, false);
        return await message.channel.send("🚫 Servidor Registrado. Peça aos desenvolvedores para autorizarem o uso do bot no servidor 🚫"); 
      }

      //TODO Descobrir por que o valor não está sendo atualizado no banco.
      if (!command) return;
      if (!guildDB.isAuthorized) {
        if (command.name !== "auth") {
          return message.channel.send({ embeds: [embedIsNotOfficialServer] });
        }
      }
      if (command) (command as Command).run(client, message, args);
    } catch (error) {
      console.log(error);
    }
  },
};
