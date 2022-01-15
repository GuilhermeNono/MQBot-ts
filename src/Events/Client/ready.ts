import { Event } from "../../interfaces";
import { cyan } from "colors";
import { Contador, MuteRefil, InitDB } from "../Cycle";
import ExtendedClient from "../../Client";
export const event: Event = {
  name: "ready",
  run: async (client: ExtendedClient) => {
    try {
      await InitDB(client)
      console.log(cyan(`✨${client.user.tag}'s Online!✨`));
      await MuteRefil(client);
      await Contador(client);
    } catch (error) {
      console.log(error);
    }
  },
};
