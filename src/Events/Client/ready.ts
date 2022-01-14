import { Event } from "@Interface";
import { cyan } from "colors";
import { Contador, MuteRefil, InitDB } from "@Cycle";
import ExtendedClient from "@Client";

export const event: Event = {
  name: "ready",
  run: async (client: ExtendedClient) => {
    try {
      console.log(cyan(`✨${client.user.tag}'s Online!✨`));

      // await InitDB(client)
      // await MuteRefil(client);
      // await Contador(client);
    } catch (error) {
      console.log(error);
    }
  },
};
