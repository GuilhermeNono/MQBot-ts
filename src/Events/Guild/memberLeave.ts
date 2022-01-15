import ExtendedClient from "../../Client";
import { Event } from "../../interfaces";
import { CheckRole } from "../../../lib/modules";
import { Guild, GuildBasedChannel, GuildMember } from "discord.js";

export const event: Event = {
  name: "guildMemberRemove",
  run: async (client: ExtendedClient, member: GuildMember) => {

    const muteRole: CheckRole = new CheckRole(client, member, [
      "929459533200375839",
    ]);

    if (muteRole.CheckReturnBoolean()) {
      let guildMember:Guild = client.guilds.cache.get(member.guild.id);
      let channelMember:GuildBasedChannel = guildMember.channels.cache.get('929786857464668222');
      if(channelMember.type === "GUILD_TEXT") {
        channelMember.send("O cara ta fazendo merda ae em.");
      }
    }
  },
};
