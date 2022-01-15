import ExtendedClient from "../../Client/index.js";
import { Databases } from "../../../lib/modules/index.js";
import { UserDataModel } from "../../../models/index.js";
import {
  Guild,
  GuildMember,
  Role,
} from "discord.js";
import ms from "ms";

async function MuteRefil(client: ExtendedClient): Promise<any> {
  try {
    setInterval(async () => {
      var today: Date = new Date();
      var time: number = today.getHours();

      if (time === 0) {
        const guild: Guild = client.guilds.cache.get("929417995325956177");
        const roleBuff: Role = guild.roles.cache.find(
          (role) => role.id === "929777206631223346"
        );
        const membersRole: string[] = roleBuff.members.map((user) => user.id);
        let userCreateDB: Databases = new Databases();
        for (let i in membersRole) {
          let dbMembers = await UserDataModel.findOne({
            userId: membersRole[i],
          }).exec();

          if (dbMembers === null) {
            let member: GuildMember = guild.members.cache.find(
              (userID) => userID.id === membersRole[i]
            );
            await userCreateDB.UserData(member.user.id, false, false, 0, 0, 2);
          } else {
            let AvbMutes: number = await dbMembers.avbMutes;
            if (AvbMutes <= 1) {
              await UserDataModel.findOneAndUpdate(
                { userId: membersRole[i] },
                { avbMutes: 2 }
              ).exec();
            }
          }
        }
      }
    }, ms("1h"));
  } catch (error) {
    console.log(error);
  }
}

export default MuteRefil;
