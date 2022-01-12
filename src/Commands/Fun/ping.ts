import ExtendedClient from "@Client";
import { Command } from "@Interface";
import { Timer, mTimer, CheckRole,  Databases, EmbedTemplates} from "@Modules";
import { GuildMember, Message, MessageEmbed, User } from "discord.js";
import { connect } from "mongoose";

export const command: Command = {
  name: "ping",
  aliases: ["pg"],
  run: async (client:ExtendedClient, message:Message<boolean>, args:string[]) => {
    //TODO: Timer.start() funcionando corretamente e, mTimer também está funcionando como o esperado.
    // Timer.start() > Para iniciar um contador; mTimer > Para alocar os dados na memoria.
    try {
      let teste:MessageEmbed =  new MessageEmbed()
      .setAuthor({
        name: message.author.username,
        iconURL: `${message.author.avatarURL()}`,
      })
      .setColor("#4b7eab")
      .setDescription(`**:bookmark: Motivo da punição ➟ **motivo`)
      .setThumbnail(
        "https://i.pinimg.com/originals/62/59/87/62598722b7a66b461c06e75712b79132.gif"
      )
      .addField(
        ":speak_no_evil: Usuario Mutado | ",
        `discord#4957 🡳 @discord`,
        true
      )
      .addField(
        ":timer: Tempo de Mute | ",
        "➟ " + "**:lock: Indeterminado**",
        true
      )
      .setImage(
        "https://media.discordapp.net/attachments/776094611470942208/888405813687898132/tumblr_8eb6935c7349e6667f05e8af43aa174e_1dc8ac11_1280.gif"
      )
      .setFooter({
        text: `➟ boo`,
        iconURL:
          "https://media.discordapp.net/attachments/776094611470942208/846246640867737610/peach_san.png?width=701&height=701",
      });
      return message.channel.send({embeds:[teste]})
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
