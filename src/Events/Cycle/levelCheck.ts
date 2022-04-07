import { GuildMember, Message } from "discord.js";
import { Databases } from "../../../lib/modules";
import { UserDataModel } from "../../../models";

async function levelCheck(
  message: Message<boolean>
): Promise<any> {
  try {
    const memberGuild: GuildMember = message.member;

    const memberDB = await UserDataModel.findOne({
      userId: memberGuild.id,
    }).exec();

    if (memberDB === null) return await new Databases().UserData(memberGuild.id);

    let level:number = memberDB.level;
    let xp:number = memberDB.xp;
    let nextLevel:number = memberDB.nextLevelXp;

    xp += Math.floor((Math.random() * 120) + 50);

    if (xp >= nextLevel) {
      level++;
      nextLevel = nextLevel + (nextLevel * 1.2);
      await UserDataModel.findOneAndUpdate({userId:memberGuild.id}, {$set:{level:level, nextLevelXp:nextLevel, xp:0}});
    } else {
      await UserDataModel.findOneAndUpdate({userId:memberGuild.id}, {xp:xp});
    }
 
  } catch (error) {
    console.log(error);
  }
}

export default levelCheck;
