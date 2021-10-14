import { Command } from "../../interfaces";

export const command: Command = {
    name: 'ping',
    aliases: ['pg'],
    run: async(client, message, args) => {
        message.channel.send(`${client.ws.ping} ping!`)
    }
}