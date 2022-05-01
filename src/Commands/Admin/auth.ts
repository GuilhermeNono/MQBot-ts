import { Command } from "../../interfaces";
import { GuildDataModel } from "../../../models/index";
import { Databases } from "../../../lib/modules";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "auth",
  isOff: false,
  aliases: [""],
  run: async (client, message, args) => {
    if (message.author.id !== "261945904829956097") return message.react("❌");
    try {
      const embedAuth = new MessageEmbed()
        .setTitle("🔰Servidor autorizado e verificado.🔰")
        .setFooter({
          text: `Contate o Desenvolvedor para mais informações. ➟ ${
            client.users.cache.get("261945904829956097").tag
          }`,
        })
        .setColor("GREEN");

      const embedAlreadyAuth = new MessageEmbed()
        .setTitle("💠O Servidor já está autorizado💠")
        .setFooter({
          text: `Contate o Desenvolvedor para mais informações. ➟ ${
            client.users.cache.get("261945904829956097").tag
          }`,
        })
        .setColor("#14ffff");

      let guildDB = await GuildDataModel.findOne({
        guildID: message.guild.id,
      }).exec();

      if (!guildDB) {
        await new Databases().GuildData(
          message.guild.id,
          message.guild.ownerId,
          true,
          null
        );
        return message.channel.send({ embeds: [embedAuth] });
      }

      if (guildDB.isAuthorized === true)
        return message.channel.send({ embeds: [embedAlreadyAuth] });

      await GuildDataModel.findOneAndUpdate({ guildID: message.guild.id },{isAuthorized: true }).exec()
      message.channel.send({ embeds: [embedAuth] });
        
    } catch (error) {
      console.log(error);
    }
  },
};
