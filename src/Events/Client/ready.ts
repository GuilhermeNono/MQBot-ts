import { Event } from "@Interface";
import { cyan } from 'colors'
import {Contador} from "@Cycle"
export const event:Event = {
    name: 'ready',
    run: async (client) => {
        console.log(cyan(`✨${client.user.tag}'s Online!✨`))

        await Contador(client);
    }
}