import { Event } from "../../interfaces/index.js";
import { cyan } from "colors";
// import { Contador, MuteRefil, InitDB } from "../Cycle/index.js";
import ExtendedClient from "../../Client/index.js";
export const event: Event = {
  name: "ready",
  run: async (client: ExtendedClient) => {
    try {
      // await InitDB(client)
      console.log(cyan(`✨${client.user.tag}'s Online!✨`));
      // await MuteRefil(client);
      // await Contador(client);
    } catch (error) {
      console.log(error);
    }
  },
};
