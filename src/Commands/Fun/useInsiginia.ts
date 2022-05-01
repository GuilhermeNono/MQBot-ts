import { Command } from "../../interfaces";
import {UserDataModel, insigniaDataModel} from '../../../models'
import { Databases, CheckRole} from "../../../lib/modules";
import { MessageEmbed } from "discord.js";

export const command:Command = {
    name: "useinsignia",
    aliases: ["useins"],
    description: "Equipa uma insignia existente no seu inventário.",
    run: async (client, message, args) => {
        //.useinsignia 1 2

        const userData = await UserDataModel.findOne({userId: message.author.id, serverId:message.guildId}).exec();
        if(!userData){
            new Databases().UserData(message.author.id, message.guildId);
            return message.react("❌");
        }

        const insignias = userData.insigniaID;

        if(!args[0]) return message.channel.send("❌ **| Você não especificou o ID da insignia que deseja equipar.**");
        if(!args[1]) args[1] = userData.secondaryInsignia.toString();

        if(!isNaN(parseInt(args[0]))){
            if(insignias.includes(parseInt(args[0]))){
                userData.primaryInsignia = parseInt(args[0]);
                // return message.channel.send("✅ **| Insignia equipada com sucesso!**");
            } else {
                return message.channel.send("❌ **| Você não possui a insignia com ID " + "`" + args[0] +"`"+ " em seu inventario.**");
            }
        } else {
            let name = args[0].toLowerCase();
            name = name.charAt(0).toUpperCase() + name.slice(1);

            const insigniaData = await insigniaDataModel.findOne({insigniaName: name}).exec();
            if(!insigniaData) return message.channel.send("❌ **| Insignia não encontrada.**");
            if(insignias.includes(insigniaData.insigniaID)){
                userData.primaryInsignia = insigniaData.insigniaID;
                // return message.channel.send("✅ **| Insignia equipada com sucesso!**");
            } else {
                return message.channel.send("❌ **| Você não possui a insignia com nome " + "`" + args[0] +"`"+ " em seu inventario.**");
            }
        }

        if(!isNaN(parseInt(args[1]))) {
            if(insignias.includes(parseInt(args[1]))){
                userData.secondaryInsignia = parseInt(args[1]);
                // return message.channel.send("✅ **| Insignia equipada com sucesso!**");
            } else {
                return message.channel.send("❌ **| Você não possui a insignia com ID " + "`" + args[1] +"`"+ " em seu inventario.**");
            }
        } else {
            let name = args[0].toLowerCase();
            name = name.charAt(0).toUpperCase() + name.slice(1);

            const insigniaData = await insigniaDataModel.findOne({insigniaName: name}).exec();
            if(!insigniaData) return message.channel.send("❌ **| Insignia não encontrada.**");
            if(insignias.includes(insigniaData.insigniaID)){
                userData.secondaryInsignia = insigniaData.insigniaID;
                // return message.channel.send("✅ **| Insignia equipada com sucesso!**");
            } else {
                return message.channel.send("❌ **| Você não possui a insignia com nome " + "`" + args[1] +"`"+ " em seu inventario.**");
            }
        }

        if((userData.primaryInsignia === userData.secondaryInsignia) && 
        (userData.primaryInsignia !== 0 && userData.secondaryInsignia !== 0)){
            return message.channel.send("❌ **| Você não pode equipar duas insignias iguais.**");
        }

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("✅ | Insignia equipada com sucesso!")
        .setDescription("`"+"♦ID da primeira insignia ➔ " + userData.primaryInsignia + "\n♦ID da segunda insignia ➔ " + userData.secondaryInsignia +"`");

        BypassVerification();

        userData.save().then(() => message.channel.send({embeds:[embed]}));

        function BypassVerification() {

            const bypassRole = message.guild.roles.cache.find(role => role.id === "949898954898808872");
            if(!bypassRole) return;
            const haveBypassRole = new CheckRole(client, message.member, [bypassRole.id]).CheckReturnBoolean();

            if(!haveBypassRole) {
                if(userData.primaryInsignia === 4 || userData.secondaryInsignia === 4){
                    return message.member.roles.add(bypassRole);
                } 
            } else {
                if(userData.primaryInsignia !== 4 && userData.secondaryInsignia !== 4){
                    return message.member.roles.remove(bypassRole);
                } 
            }
            
        }
    }
}

