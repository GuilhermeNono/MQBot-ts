"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../lib/modules/index.js");
const index_js_2 = require("../../../models/index.js");
const colors_1 = require("colors");
async function InitDB(client) {
    try {
        console.log((0, colors_1.yellow)(`⌛ Initiating members database verification...⌛`));
        const guildNone = client.guilds.cache.get(process.env["GUILD_ID"]);
        guildNone.members.cache.forEach(async (member) => {
            const memberDB = await index_js_2.UserDataModel.findOne({
                userId: member.id,
            }).exec();
            if (memberDB === null) {
                await new index_js_1.Databases().UserData(member.id);
            }
        });
        console.log(colors_1.green.bold(`✔ Database checking with no apparent errors. ✔`));
    }
    catch (error) {
        console.log(colors_1.red.bold(`❌ Error while checking databases. ❌`));
        throw error;
    }
}
exports.default = InitDB;
