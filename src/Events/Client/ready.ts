import { Event } from "../../interfaces/index";
// import { cyan } from "colors";
import { Contador, MuteRefil, InitDB } from "../Cycle/index";
import ExtendedClient from "../../Client/index";
export const event: Event = {
  name: "ready",
  run: async (client: ExtendedClient) => {
      console.log(`✨${client.user.tag}'s Online!✨`);
      // await InitDB(client);
      // await MuteRefil(client);
      // await Contador(client);
  },
};
