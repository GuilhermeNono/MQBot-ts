import { Client, Collection } from "discord.js";
import mongoose from 'mongoose'
import path from 'path'
import {readdirSync} from 'fs'
import {Command, Event} from '../interfaces'
import dotenv from 'dotenv'
dotenv.config()

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();

    public async init() { 
        this.login(process.env["DISCORD_TOKEN"]);
        await mongoose.connect(process.env["MONGODB_LOGIN"]);

        //Commands

        const commandPath = path.join(__dirname, "..", "Commands")
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith('.ts'))
            for(const file of commands) {
                const {command} = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);

                if(command?.aliases.length !== 0) {
                    command.aliases.forEach((alias: any) => {
                        this.aliases.set(alias, command)
                    });
                }
            }
        })

        // Events

        const eventPath = path.join(__dirname, "..", "Events")
        readdirSync(eventPath).filter(async (file) => {
            const {event} = await import(`${eventPath}/${file}`)
            this.events.set(event.name, event);
            // console.log(event);
            this.on(event.name, event.run.bind(null, this))
        })
    }
    
}

export default ExtendedClient;