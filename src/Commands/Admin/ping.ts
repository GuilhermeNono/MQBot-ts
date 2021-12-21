import { Command } from "@Interfaces";
import {Timer, mTimer} from "@Modules"

export const command: Command = {
    name: 'ping',
    aliases: ['pg'],
    run: async(client, message, args) => {
        //TODO: Timer.start() funcionando corretamente e, mTimer também está funcionando como o esperado. 
        // Timer.start() > Para iniciar um contador; mTimer > Para alocar os dados na memoria.
        const timer: Timer = new Timer(() => {
            message.channel.send("pong")
            mTimer.delete(message.author.id)
            console.log("3")
        }, 5000)
        timer.start()
        console.log("1")
        mTimer.set(message.author.id, timer)
        console.log("2");        
    }
    
}