import { Command } from "@Interface";
import { Timer, mTimer } from "@Modules";
import { GuildMember, User } from "discord.js";

export const command: Command = {
  name: "ping",
  aliases: ["pg"],
  run: async (client, message, args) => {
    //TODO: Timer.start() funcionando corretamente e, mTimer também está funcionando como o esperado.
    // Timer.start() > Para iniciar um contador; mTimer > Para alocar os dados na memoria.
    try {
      message.channel.send("pong!🏓");
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
