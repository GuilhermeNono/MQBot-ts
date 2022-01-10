import ExtendedClient from "@Client";
import { Event } from "@Interfaces/Event";
import { UserDataModel } from "@Models";
import { Databases } from "@Modules";
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
