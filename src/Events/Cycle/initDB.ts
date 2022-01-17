import ExtendedClient from '../../Client/index';
import { Databases } from "../../../lib/modules/index";
import { UserDataModel } from "../../../models/index";
import { Client, Guild } from "discord.js";
import {green, red, yellow } from "colors";

async function InitDB(client: Client<true>): Promise<any> {
  try {
    console.log(
        yellow(`⌛ Initiating members database verification...⌛`)
      );
    const guildNone: Guild = client.guilds.cache.get(process.env["GUILD_ID"]);

    guildNone.members.cache.forEach(async (member) => {
      const memberDB = await UserDataModel.findOne({
        userId: member.id,
      }).exec();
      if (memberDB === null) {
        await new Databases().UserData(member.id);
      }
    });
    console.log(
        green.bold(`✔ Database checking with no apparent errors. ✔`)
      );
  } catch (error) {
    console.log(
        red.bold(`❌ Error while checking databases. ❌`)
      );
    throw error;
  }
}

export default InitDB;