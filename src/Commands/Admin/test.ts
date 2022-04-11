import { Command } from "../../interfaces";
import {DBInfoServer} from '../../interfaces/index';
import { UserDataModel } from '../../../models/index'
import { Databases } from "../../../lib/modules";

export const command: Command = {
    name: "test",
    aliases: ["teste", "ts"],
    run: async (client, message, args) => {
        if(message.author.id !== "261945904829956097") return
        try {
            let dbInfo:DBInfoServer;

                
            let userDB = await UserDataModel.find({ userId: message.member.id }).exec();


            if(userDB.length === 0) {
                await new Databases().UserData(message.member.id, message.guild.id);
            } else {
                userDB.forEach((db) => {
                    if(db.serverId === message.guild.id) {
                        dbInfo = {
                            isExistInThisServer: true,
                            database: db,
                        }
                    }
                })

                if(!dbInfo.isExistInThisServer) {
                    await new Databases().UserData(message.member.id, message.guild.id);
                }
            }
                

            
            console.log("teste")

        } catch (error) {
            console.log(error);
        }
    }
}