import { GuildMember, Message } from "discord.js";
import { Databases } from "../../../lib/modules";
import { UserDataModel, GuildDataModel, insigniaDataModel} from "../../../models";
import ExtendedClient from "../../Client";
import { BypassINS } from '../Insignias/index'

async function levelCheck(client:ExtendedClient, message: Message<boolean>): Promise<any> {
  try {
    //*1 Checando se o servidor está autorizado a usar o sistema de XP
    const guildInfo = await GuildDataModel.findOne({
      guildID: message.guild.id,
    }).exec();

    if (!guildInfo) return;
    if (guildInfo.isAuthorized) {
      
      //*2 Checando se o usuario está no banco de dados
      const memberGuild: GuildMember = message.member;

      const memberDB = await UserDataModel.findOne({
        userId: memberGuild.id,
        serverId: memberGuild.guild.id,
      }).exec();

      if (memberDB === null) {
        return await new Databases().UserData(
          memberGuild.id,
          memberGuild.guild.id
        );
      }

      let primaryInsignia = memberDB.primaryInsignia;
      let secondaryInsignia = memberDB.secondaryInsignia;

      let insigniaInfo = await insigniaDataModel.findOne({insigniaID:primaryInsignia}).exec();
      primaryInsignia = Number(insigniaInfo.xpBoost);
      insigniaInfo = await insigniaDataModel.findOne({insigniaID:secondaryInsignia}).exec();
      secondaryInsignia = Number(insigniaInfo.xpBoost);

      const xpBoost = primaryInsignia + secondaryInsignia;

      //*3 Iniciando o processo de destribuição de xp
      let level: number = memberDB.level;
      let xp: number = memberDB.xp;
      let nextLevel: number = memberDB.nextLevelXp;

      let boost = parseFloat((0 + (1 * xpBoost)).toFixed(1))
      let baseFunction = Math.floor(Math.random() * ((level * 100) - (level * 50))) + level * 50
      
      xp += Math.round((baseFunction * boost) + baseFunction);

      if (xp >= nextLevel) {

        if(level === 30){
          await BypassINS(client, message)
        }

        //*4 Verificando se o usuario tem xp o suficiente para subir de nivel
        level++;

        if(level === 30) {
          
        }

        nextLevel = Math.round((nextLevel + nextLevel * 1.2) / 1.5);
        await UserDataModel.findOneAndUpdate(
          { userId: memberGuild.id, serverId: memberGuild.guild.id },
          { $set: { level: level, nextLevelXp: nextLevel, xp: 0 } }
        );
      } else {
        await UserDataModel.findOneAndUpdate(
          { userId: memberGuild.id, serverId: memberGuild.guild.id },
          { xp: xp }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default levelCheck;
