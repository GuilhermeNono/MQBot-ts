import { Event } from "@Interface";
import { cyan } from 'colors'
export const event:Event = {
    name: 'ready',
    run: async (client) => {
        console.log(cyan(`✨${client.user.tag}'s Online!✨`))
    }
}