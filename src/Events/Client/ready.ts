import { Event } from "@Interface";
import { cyan } from 'colors'
import {Contador, MuteRefil} from "@Cycle"
import ExtendedClient from "@Client";
export const event:Event = {
    name: 'ready',
    run: async (client:ExtendedClient) => {
        console.log(cyan(`✨${client.user.tag}'s Online!✨`))

        await MuteRefil(client)
        await Contador(client);
    }
}