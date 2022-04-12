import { Message } from "discord.js";
import {UserDataModel} from '../../../models/index';

export async function BypassINS(message:Message<boolean>): Promise<void> {
    try {
        //Adicionar o ID da insignia "Bypass" ao BDD do usuario.

        //TODO: Testar funcionalidade do Bypass.

        let memberDB = await UserDataModel.findOne({userId: message.member.id, serverId: message.guild.id}).exec();
        if (memberDB === null) return;
        
        let insignias = memberDB.insigniaID.push(4);
        
    } catch (error) {
        console.log(error)
    }
}