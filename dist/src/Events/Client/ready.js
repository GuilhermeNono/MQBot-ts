"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
// import { cyan } from "colors";
const index_js_1 = require("../Cycle/index.js");
exports.event = {
    name: "ready",
    run: async (client) => {
        console.log(`✨${client.user.tag}'s Online!✨`);
        await (0, index_js_1.InitDB)(client);
        await (0, index_js_1.MuteRefil)(client);
        await (0, index_js_1.Contador)(client);
    },
};
