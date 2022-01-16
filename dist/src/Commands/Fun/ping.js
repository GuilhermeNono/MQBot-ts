"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "ping",
    aliases: ["pg"],
    run: async (client, message, args) => {
        try {
            return message.channel.send("pong🏓");
        }
        catch (error) {
            console.log(`${error}`);
        }
    },
};
