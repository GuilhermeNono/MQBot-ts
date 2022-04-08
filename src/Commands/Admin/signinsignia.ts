import { Command } from "../../interfaces";
import { InsigniaInfo } from "../../interfaces/index";
import { Databases } from "../../../lib/modules/index";
import { Message } from "discord.js";
import { loadImage } from "canvas";

export const command: Command = {
  name: "signinsignia",
  aliases: ["si", "newinsignia", "ni"],
  description: "Cria uma nova insignia.",
  run: async (client, message, args) => {
    try {
      if (message.member.id !== "261945904829956097")
        return message.channel.send(
          "Esse comando só pode ser utilizado pelo Desenvolvedor."
        );

      if(!args[0]) return message.channel.send("Sintaxe = .signinsignia [id] [URL] [Nome]")

        var insignia: InsigniaInfo = {
          insigniaID: 0,
          insigniaName: "",
          insigniaURL: "",
        };

      try {
        insignia.insigniaID = parseInt(args[0]);
      } catch {
        insignia.insigniaID = null;
      }

      try {
        insignia.insigniaURL = args[1];
      } catch {
        insignia.insigniaURL = null;
      }

      let name: string = message.content.split(" ").splice(3).join(" ");
      if (name === "") return message.react('❌');

      try {
        insignia.insigniaName = name;
      } catch {
        insignia.insigniaName = null;
      }
      if (
        insignia.insigniaID == null ||
        insignia.insigniaName == null ||
        insignia.insigniaURL == null
      ) {
        return message.channel.send(
          "Algum dos dados não foi informado corretamente."
        );
      } else {
        new Databases()
          .InsigniaData(
            insignia.insigniaID,
            insignia.insigniaName,
            insignia.insigniaURL
          )
          .then(async (result) => {
            if(message.deletable) await message.delete();

            return message.channel.send(`Insignia *"${name}"* criada com sucesso.`);
          });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
