import { GuildMember, Message } from "discord.js";
import { Databases } from "../../../lib/modules";
import { UserDataModel } from "../../../models";
import { DBInfoServer } from "../../interfaces";

async function levelCheck(
  message: Message<boolean>
): Promise<any> {
  try {
    const memberGuild: GuildMember = message.member;

    //TODO Terminar de implementar a flexibilidade no banco para servidores.

    const memberDB = await UserDataModel.findOne({
      userId: memberGuild.id,
      serverId: memberGuild.guild.id,
    }).exec();

    if (memberDB === null) {
      return await new Databases().UserData(memberGuild.id, memberGuild.guild.id);
    } 

    let level:number = memberDB.level;
    let xp:number = memberDB.xp;
    let nextLevel:number = memberDB.nextLevelXp;

    xp += Math.floor((Math.random() * (level * 100)) + (level * 50));

    if (xp >= nextLevel) {
      level++;
      nextLevel = Math.round((nextLevel + (nextLevel * 1.2)) / 1.5);
      await UserDataModel.findOneAndUpdate({userId:memberGuild.id, serverId:memberGuild.guild.id}, {$set:{level:level, nextLevelXp:nextLevel, xp:0}});
    } else {
      await UserDataModel.findOneAndUpdate({userId:memberGuild.id, serverId:memberGuild.guild.id}, {xp:xp});
    }
 
  } catch (error) {
    console.log(error);
  }
}

export default levelCheck;
