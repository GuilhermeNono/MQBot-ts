import ExtendedClient from "../../Client/index";
import { Event } from "../../interfaces/Event";
import { CheckRole, muteCheck } from "../../../lib/modules/index";
import { Guild, GuildBasedChannel, GuildMember } from "discord.js";

export const event: Event = {
  name: "guildMemberRemove",
  run: async (client: ExtendedClient, member: GuildMember) => {
    const muteRole: CheckRole = new CheckRole(client, member, [
      "929459533200375839",
    ]);

    if (muteRole.CheckReturnBoolean()) {
      muteCheck.set(member.id, true);
    }
  },
};
