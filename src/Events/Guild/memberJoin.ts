import ExtendedClient from "../../Client/index";
import { Event } from "../../interfaces/Event";
import { UserDataModel } from "../../../models/index";
import { Databases } from "../../../lib/modules/index";
import { Guild, GuildMember, Role } from "discord.js";

export const event: Event = {
  name: "guildMemberAdd",
  run: async (client: ExtendedClient, member: GuildMember) => {
      //Checando se o usuario já tem um banco no servidor.
    let doc = await UserDataModel.findOne({ userId: member.id }).exec();
    const databases: Databases = new Databases();
    if (doc === null) {
      await databases.UserData(member.id);
    }
  },
};
