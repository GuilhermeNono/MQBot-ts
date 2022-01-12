import ExtendedClient from "@Client";
import { Command } from "@Interface";
import { Timer, mTimer, CheckRole,  Databases, EmbedTemplates} from "@Modules";
import { GuildMember, Message, User } from "discord.js";
import { connect } from "mongoose";

export const command: Command = {
  name: "ping",
  aliases: ["pg"],
  run: async (client:ExtendedClient, message:Message<boolean>, args:string[]) => {
    //TODO: Timer.start() funcionando corretamente e, mTimer também está funcionando como o esperado.
    // Timer.start() > Para iniciar um contador; mTimer > Para alocar os dados na memoria.
    try {
      return message.channel.send({embeds:[new EmbedTemplates(client).AutoMute()]})
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
