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
            let teste = 1.5;
            typeof teste;
        } catch (error) {
            console.log(error);
        }
    }
}