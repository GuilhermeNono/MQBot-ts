import ExtendedClient from "../../Client/index";
import { Event } from "../../interfaces/Event";
import { UserDataModel } from "../../../models/index";
import { Databases, muteCheck } from "../../../lib/modules/index";
import {
  Guild,
  GuildBasedChannel,
  GuildMember,
  Message,
  MessageEmbed,
  Role,
} from "discord.js";

export const event: Event = {
  name: "guildMemberAdd",
  run: async (client: ExtendedClient, member: GuildMember) => {
    //Checando se o usuario já tem um banco no servidor.
    let doc = await UserDataModel.findOne({ userId: member.id }).exec();
    const databases: Databases = new Databases();
    if (doc === null) {
      await databases.UserData(member.id);
    }
    if (muteCheck.get(member.id)) {
      muteCheck.delete(member.id);
      let guildMember: Guild = client.guilds.cache.get(member.guild.id);
      let channelMember: GuildBasedChannel =
        guildMember.channels.cache.get("929786857464668222");
      const warningEmbed: MessageEmbed = new MessageEmbed()
        .setAuthor({
          name: client.user.username,
          iconURL: `${client.user.avatarURL()}`,
        })
        .setTitle("💢 Possivel tentativa de Quitbug! 💢")
        .addField("\u200b", `<@&929435905926791168>`)
        .setDescription(
          "Quitbug(o ato de sair do servidor para retirar sua punição) é estritamente proibido nesse servidor. **[Regra 12]**"
        )
        .setColor("RED")
        .setFooter({
          text: `User ➙ ( ${member.user.username} ) | ID ➙ ( ${member.user.id} )`,
          iconURL: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/768px-Red_X.svg.png`,
        });
      if (channelMember.type === "GUILD_TEXT") {
        channelMember.send({ embeds: [warningEmbed] });
      }
    }
  },
};
