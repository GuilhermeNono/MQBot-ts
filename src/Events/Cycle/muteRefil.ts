import { Databases } from "../../../lib/modules/index";
import { UserDataModel } from "../../../models/index";
import { Client, Guild, GuildMember, Role } from "discord.js";
//@ts-ignore
import ms from "ms";
import { DBInfoServer } from "../../interfaces";

async function MuteRefil(client: Client<true>): Promise<any> {
  try {
    setInterval(async () => {
      var today: Date = new Date();
      var time: number = today.getHours();

      if (time === 0) {
        const guild: Guild = client.guilds.cache.get(
          process.env.GUILD_ID_BRIOCO
        );
        const roleBuff: Role = guild.roles.cache.find(
          (role) => role.id === "929777206631223346"
        );
        const membersRole: string[] = roleBuff.members.map((user) => user.id);
        for (let i in membersRole) {
          const dbMembers = await UserDataModel.findOne({
            userId: membersRole[i],
            serverId: guild.id,
          }).exec();

          let member: GuildMember = guild.members.cache.find(
            (userID) => userID.id === membersRole[i]
          );
          if (dbMembers === null) {
            await new Databases().UserData(
              member.user.id,
              member.guild.id,
              false,
              false,
              0,
              0,
              2
            );
          } else {
            let AvbMutes: number = dbMembers.avbMutes;
            if (AvbMutes <= 1) {
              await UserDataModel.findOneAndUpdate(
                { userId: membersRole[i], serverId: guild.id },
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
