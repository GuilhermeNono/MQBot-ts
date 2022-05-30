import { Command } from "../../interfaces";
import {DBInfoServer} from '../../interfaces/index';
import { UserDataModel} from '../../../models/index'
import { Databases } from "../../../lib/modules";

export const command: Command = {
    name: "test",
    aliases: ["teste", "ts"],
    run: async (client, message, args) => {
        if(message.author.id !== "261945904829956097") return
        try {
            // const members = message.guild.members.cache.map(f => f.id)
            // let member;
            // let memberRole;
            // for(let i in members) {
            //     member = message.guild.members.cache.get(members[i]);
            //     memberRole = member.roles.cache.find(f => f.id === "939195863245422624")
            //     if(memberRole){
            //         const teste1 = await UserDataModel.findOne({userId:member.id}).exec();
            //         const insignias = teste1.insigniaID
            //         const newArray = insignias.push(5);
            //         await UserDataModel.findOneAndUpdate({userId:member.id},{insigniaID:insignias}).exec();
            //     }
            // }
            // await UserDataModel.find({serverId: {$exists:false}}).exec();
            return message.react("✅");
        } catch (error) {
            console.log(error);
        }
    }
}