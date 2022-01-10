import { Command } from "@Interface";
import { Timer, mTimer, CheckRole,  Databases} from "@Modules";
import { GuildMember, User } from "discord.js";
import { connect } from "mongoose";

export const command: Command = {
  name: "ping",
  aliases: ["pg"],
  run: async (client, message, args) => {
    //TODO: Timer.start() funcionando corretamente e, mTimer também está funcionando como o esperado.
    // Timer.start() > Para iniciar um contador; mTimer > Para alocar os dados na memoria.
    try {
      const DatabasesClass:Databases = new Databases();
      const db:() => Promise<void> = async () => {
        return console.log(await DatabasesClass.UserData(message.member.id))
      }
      await db();
      
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
