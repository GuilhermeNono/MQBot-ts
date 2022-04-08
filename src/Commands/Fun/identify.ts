import { GuildMember, MessageEmbed } from "discord.js";
import { EmbedTemplates } from "../../../lib/modules";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "identify",
  aliases: ["id"],
  description: "Informa o ID do usuario",
  run: async (client, message, args) => {
    try {
      //.id @Frajola
      const Embeds: EmbedTemplates = new EmbedTemplates(client);

      //*1 Checando se o usuario existe

      let person: GuildMember;

      //Checando se o argumento foi uma marcação.
      let personCheck: Boolean = message.mentions.users.first() === undefined;

      //Checando se o argumento é um parametro vazio.
      if (args[0] === undefined || "") person = message.member;

      //Checando se o argumento começa com letras.
      if (/^[a-zA-Z]+$/.test(args[0])) {
        person = message.member;
      }

      //Checando se o argumento informado é igual a um numero.
      if (!isNaN(parseInt(args[0]))) {
        //Checando se contem alguma letra em meio aos numeros.
        try {
          person = message.guild.members.cache.find(
            (memberID) => memberID.id === args[0]
          );
        } catch {
          person = message.member;
        }
      } else {
        person = personCheck
          ? message.guild.members.cache.get(args[0])
          : message.guild.members.cache.get(message.mentions.users.first().id);
      }

      if (!person) person = message.member;

      //*2 Informando o ID do usuario.

      const idEmbed: MessageEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`ID do usuaro *${person.user.tag}*: __${person.id}__`);

      if (message.deletable) {
        await message.delete();
      }

      await message.channel.send({ embeds: [idEmbed] });
    } catch (error) {
      console.log(error);
    }
  },
};
