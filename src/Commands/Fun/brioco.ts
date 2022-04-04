import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "brioco",
  aliases: ["convite", "invite"],
  description: "Informa o servidor Oficial do Brioco.",
  run: async (client, message, args) => {
    try {
      const embed: MessageEmbed = new MessageEmbed();
      embed.setAuthor({
        name: "🔰Convite Brioco🔰",
        iconURL: `${message.guild.iconURL()}`,
        url: "https://discord.gg/eJwxMp9Kpr",
      });
      embed.setColor("RED");
      embed.addField("| Convite Brioco |", "🔺 https://discord.gg/eJwxMp9Kpr 🔺");

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
