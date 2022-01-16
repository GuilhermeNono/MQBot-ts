"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const index_js_1 = require("../../../models/index.js");
const index_js_2 = require("../../../lib/modules/index.js");
exports.event = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        //Checando se o usuario já tem um banco no servidor.
        let doc = await index_js_1.UserDataModel.findOne({ userId: member.id }).exec();
        const databases = new index_js_2.Databases();
        if (doc === null) {
            await databases.UserData(member.id);
        }
    },
};
