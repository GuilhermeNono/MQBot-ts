import { Event, Command } from "@Interfaces";
import { Message } from "discord.js";

export const event:Event = {
    name: 'messageCreate',
    //@ts-ignore
    run: async (client, message:Message) => {
        try {
            if(
                message.author.bot ||
                !message.guild ||
                !message.content.startsWith(process.env["BOT_PREFIX"])
            ) return
    
            const args = message.content
                .slice(process.env["BOT_PREFIX"].length)
                .trim()
                .split(/ +/g);
    
            const cmd = args.shift().toLowerCase();
            if(!cmd) return
            const command = client.commands.get(cmd) || client.aliases.get(cmd)
            if(command) (command as Command).run(client, message, args);
        } catch (error) {
            
        }
        
    }
}