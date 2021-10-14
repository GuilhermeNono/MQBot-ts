import { Event } from "../interfaces";

export const event:Event = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.tag} Online!`)
    }
}