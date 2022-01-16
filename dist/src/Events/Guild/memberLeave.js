"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const index_js_1 = require("../../../lib/modules/index.js");
exports.event = {
    name: "guildMemberRemove",
    run: async (client, member) => {
        const muteRole = new index_js_1.CheckRole(client, member, [
            "929459533200375839",
        ]);
        if (muteRole.CheckReturnBoolean()) {
            let guildMember = client.guilds.cache.get(member.guild.id);
            let channelMember = guildMember.channels.cache.get('929786857464668222');
            if (channelMember.type === "GUILD_TEXT") {
                channelMember.send("O cara ta fazendo merda ae em.");
            }
        }
    },
};
