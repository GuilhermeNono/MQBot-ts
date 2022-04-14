import { Command } from "../../interfaces";
import {insigniaDataModel} from '../../../models';
import { MessageEmbed } from "discord.js";
import { Rarity } from "../../../lib/modules";

export const command: Command = {
    name:"insignia",
    aliases:["insigniainfo"],
    isOff:false,
    run:async (client,message,args)=>{
        //.insignia [id] || [nome]
        try {
            
            if(!args[0]) return message.channel.send(`${message.author}, você deve informar um ID ou nome da insignia.`);

            

            //*1 Checando se o primeiro argumento é um numero.
            if(!isNaN(parseInt(args[0]))) {
                const insigniaInfoModel = await insigniaDataModel.findOne({insigniaID:args[0]}).exec();

                if(!insigniaInfoModel) return message.channel.send(`${message.author}, não foi encontrada nenhuma insignia com esse ID.`);

                const colorRarityInsignia = new Rarity(client, insigniaInfoModel.rarity).getColorRarity();
                const emojiRarityInsignia = new Rarity(client, insigniaInfoModel.rarity).getEmojiRarity();

                const embed = new MessageEmbed()
                .setTitle(`Informações da insignia ➔ ${insigniaInfoModel.insigniaName}`)
                .setColor(colorRarityInsignia)
                .setDescription("`" + `${insigniaInfoModel.description}` + "`")
                .setAuthor({name:client.user.username, iconURL:client.user.avatarURL()})
                .setThumbnail(insigniaInfoModel.insigniaURL)
                .addFields(
                    {name:"ID | ", value:`${insigniaInfoModel.insigniaID}`, inline: true},
                    {name:"XP Boost |", value:`${insigniaInfoModel.xpBoost}x`, inline: true},
                    {name:"Raridade | ", value:`${insigniaInfoModel.rarity} ⬌ ` +"`" + emojiRarityInsignia + "`", inline: true}
                )

                await message.channel.send({embeds:[embed]});

            } else {
                let newArg = args[0].toLowerCase();
                newArg = newArg.charAt(0).toUpperCase() + newArg.slice(1);

                const insigniaInfoModel = await insigniaDataModel.findOne({insigniaName: newArg}).exec();

                if(!insigniaInfoModel) return message.channel.send(`${message.author}, não foi encontrada nenhuma insignia com esse nome.`);

                const colorRarityInsignia = new Rarity(client, insigniaInfoModel.rarity).getColorRarity();
                const emojiRarityInsignia = new Rarity(client, insigniaInfoModel.rarity).getEmojiRarity();

                const embed = new MessageEmbed()
                .setTitle(`Informações da insignia ➔ ${insigniaInfoModel.insigniaName}`)
                .setColor(colorRarityInsignia)
                .setDescription("`" + `${insigniaInfoModel.description}` + "`")
                .setAuthor({name:client.user.username, iconURL:client.user.avatarURL()})
                .setThumbnail(insigniaInfoModel.insigniaURL)
                .addFields(
                    {name:"ID | ", value:`${insigniaInfoModel.insigniaID}`, inline: true},
                    {name:"XP Boost |", value:`${insigniaInfoModel.xpBoost}x`, inline: true},
                    {name:"Raridade | ", value:`${insigniaInfoModel.rarity} ⬌ ` +"`" + emojiRarityInsignia + "`", inline: true}
                )

                await message.channel.send({embeds:[embed]});
            }
        } catch (error) {
            console.log(error)
        }
    }
}