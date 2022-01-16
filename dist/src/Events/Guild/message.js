"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const index_js_1 = require("../Cycle/index.js");
const discord_js_1 = require("discord.js");
exports.event = {
    name: "messageCreate",
    run: async (client, message) => {
        try {
            if (message.author.bot)
                return;
            (0, index_js_1.Report)(message, client);
            if (message.author.bot ||
                !message.guild ||
                !message.content.startsWith(process.env["BOT_PREFIX"]))
                return;
            const embedIsNotOfficialServer = new discord_js_1.MessageEmbed()
                .setColor("RED")
                .setTitle(`💢 Bot exclusivo do servidor "Brioco" 💢`);
            if (message.guild.id !== "929417995325956177")
                return message.channel.send({ embeds: [embedIsNotOfficialServer] });
            const args = message.content
                .slice(process.env["BOT_PREFIX"].length)
                .trim()
                .split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (!cmd)
                return;
            const command = client.commands.get(cmd) || client.aliases.get(cmd);
            if (command)
                command.run(client, message, args);
        }
        catch (error) { }
    },
};
