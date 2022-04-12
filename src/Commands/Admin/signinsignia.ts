import { Command } from "../../interfaces";
import { InsigniaInfo } from "../../interfaces/index";
import { Databases, SetRarity } from "../../../lib/modules/index";
import { Collection, Message, MessageEmbed } from "discord.js";

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
      //.signinsignia [id] [URL] [Nome]

      const filter = (m: Message<boolean>) =>
        !m.author.bot && m.author.id === "261945904829956097";
      var insignia: InsigniaInfo = {
        insigniaID: null,
        insigniaName: null,
        insigniaURL: null,
        insigniaBoost: null,
        insigniaRarity: null,
        insigniaDescription: null,
      };
      for (let i = 0; i <= 5; i++) {
        const collector = message.channel.awaitMessages({
          filter: filter,
          max: 1,
          idle: 40000,
          time:60000
        });
        if (i === 0) {

         var msg = await message.channel.send("Informe o ID da insignia: ");
          await collector.then(async (collected) => {
            try {
              insignia.insigniaID = parseInt(collected.first().content);
            } catch (error) {
              insignia.insigniaID = null;
            }
            if(msg.deletable) msg.delete();
          });
        } else if (i === 1) {

          var msg = await message.channel.send("Informe o Nome da insignia: ");
          await collector.then(async (collected) => {
            try {
              insignia.insigniaName = collected.first().content;
            } catch (error) {
              insignia.insigniaName = null;
            }
            if(msg.deletable) msg.delete();
          });
        } else if (i === 2) {

          var msg = await message.channel.send("Informe a descrição da insignia: ");
          await collector.then(async (collected) => {
            try {
              insignia.insigniaDescription = collected.first().content;
            } catch (error) {
              insignia.insigniaDescription = null;
            }
            if(msg.deletable) msg.delete();
          });
        } else if (i === 3) {


          var msg = await message.channel.send("Informe a URL da insignia: ");
          await collector.then(async (collected) => {
            try {
              insignia.insigniaURL = collected.first().content;
            } catch (error) {
              insignia.insigniaURL = null;
            }
            if(msg.deletable) msg.delete();
          });
        } else if (i === 4) {


            var msg = await message.channel.send("Informe o xpBoost da insignia: ");
            await collector.then(async (collected) => {
              try {
                insignia.insigniaBoost = parseFloat(collected.first().content);
              } catch (error) {
                insignia.insigniaBoost = null;
              }
              if(msg.deletable) msg.delete();
            });
        } else if (i === 5) {
          
          var msg = await message.channel.send("Informe a raridade da insignia: ");
          await collector.then(async (collected) => {
            try {
              insignia.insigniaRarity = parseInt(collected.first().content);
            } catch (error) {
              insignia.insigniaRarity = null;
            }
            if(msg.deletable) msg.delete();
          });
        }
        if (message.deletable) message.delete();
      }

      if (
        insignia.insigniaID === null ||
        insignia.insigniaName === null ||
        insignia.insigniaURL === null ||
        insignia.insigniaDescription === null ||
        insignia.insigniaBoost === null ||
        insignia.insigniaRarity === null
      ) {
        return message.channel.send(
          "Algum dos campos não foi preenchido corretamente."
        );
      }

      new Databases()
        .InsigniaData(
          insignia.insigniaID,
          insignia.insigniaName,
          insignia.insigniaURL,
          insignia.insigniaDescription,
          insignia.insigniaRarity,
          insignia.insigniaBoost
        )
        .then(async () => {
          var embedInsignia = new MessageEmbed()
            .setTitle(`${insignia.insigniaName}`)
            .setThumbnail(`${insignia.insigniaURL}`)
            .setColor(SetRarity(insignia.insigniaRarity))
            .addFields(
              { name: "ID", value: `${insignia.insigniaID}`, inline: true },
              { name: "Descrição", value: `${insignia.insigniaDescription}` },
              {
                name: "xpBoost",
                value: `${insignia.insigniaBoost}`,
                inline: true,
              },
              { name: "Raridade", value: `${insignia.insigniaRarity}` }
            )
            .setFooter({
              text: "Insignia Criada com sucesso.",
              iconURL: client.user.avatarURL(),
            });
          await message.channel.send({ embeds: [embedInsignia] });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
