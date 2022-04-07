import { MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "server",
  aliases: ["peach"],
  description: "Informa o servidor Oficial do bot.",
  run: async (client, message, args) => {
    try {
      const embed: MessageEmbed = new MessageEmbed();
      embed.setAuthor({
        name: "💠Server Oficial💠",
        iconURL: `${client.user.avatarURL()}`,
        url: "https://discord.gg/58WGCvreFS",
      });
      embed.setColor("PURPLE");

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
