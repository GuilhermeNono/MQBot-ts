"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../../../lib/modules/index.js");
const index_js_2 = require("../../../models/index.js");
const ms_1 = __importDefault(require("ms"));
async function MuteRefil(client) {
    try {
        setInterval(async () => {
            var today = new Date();
            var time = today.getHours();
            if (time === 0) {
                const guild = client.guilds.cache.get("929417995325956177");
                const roleBuff = guild.roles.cache.find((role) => role.id === "929777206631223346");
                const membersRole = roleBuff.members.map((user) => user.id);
                let userCreateDB = new index_js_1.Databases();
                for (let i in membersRole) {
                    let dbMembers = await index_js_2.UserDataModel.findOne({
                        userId: membersRole[i],
                    }).exec();
                    if (dbMembers === null) {
                        let member = guild.members.cache.find((userID) => userID.id === membersRole[i]);
                        await userCreateDB.UserData(member.user.id, false, false, 0, 0, 2);
                    }
                    else {
                        let AvbMutes = await dbMembers.avbMutes;
                        if (AvbMutes <= 1) {
                            await index_js_2.UserDataModel.findOneAndUpdate({ userId: membersRole[i] }, { avbMutes: 2 }).exec();
                        }
                    }
                }
            }
        }, (0, ms_1.default)("1h"));
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = MuteRefil;
