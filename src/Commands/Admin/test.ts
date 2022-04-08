import { Command } from "../../interfaces";

export const command: Command = {
    name: "test",
    aliases: ["teste", "ts"],
    run: async (client, message, args) => {
        if(message.author.id !== "261945904829956097") return
    }
}