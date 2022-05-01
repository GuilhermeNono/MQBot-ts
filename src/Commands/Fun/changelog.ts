import ExtendedClient from "../../Client/index";
import { Command } from "../../interfaces/index";
import { version } from "../../../package.json";
//@ts-ignore
import Pagination from "discordjs-button-pagination";
import { Message, MessageButton, MessageEmbed } from "discord.js";

export const command: Command = {
  name: "changelog",
  aliases: ["log", "atualizacao", "att", "updates", "update"],
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      const developerMessage: MessageEmbed = new MessageEmbed()
        .setTitle(`**CHANGE-LOG  v${version}➔**`)
        .setAuthor({
          name: message.client.user.username,
          iconURL: `${message.client.user.avatarURL()}`,
        })
        .setColor("#fc2626")
        .setThumbnail(
          "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-coloricon-2/21/98-512.png"
        )
        .setDescription(
          `Atualização 4.3.0 - E chegamos na atualização 4.3.x, algumas mudanças, adições e correções chegaram junto a ela, sendo elas, 
          alterações no ganho de xp, novos comandos e o novo sistema de insignias, que andará de mãos dadas com o XP e o Dinheiro do bot.
          Sem mais delongas, vamos ao change-log:`
        )
        .addField("Desenvolvedor 🠗 ", `"Frajola.#4953"`);

      const updateEmbed: MessageEmbed = new MessageEmbed()
        .setAuthor({
          name: `${message.client.user.username} ➔ Update v${version} 🔰🔰`,
          iconURL: `${message.client.user.avatarURL()}`,
        })
        .setColor("#fc2626")
        .setDescription(
          `Como a atualização passada, incrementar novos comandos não foi o principal objetivo da atualização:`
        )
        .addFields(
          { name: "**│ 🡻 Mudanças 🡻 │**", value: "\u200b" },
          {
            name: "Todas as mudanças em comandos ficarão marcados como `NEW` no `.help`",
            value: "✅ Tag `NEW` ➔ `.help`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name:"Existe agora uma verificação para o uso do bot em novos servidores, mais detalhes em breve.",
            value: "✅ New Servers ➔ `Experimental`",
          },
          {
            name: "O sistema de XP ainda anda em fase experimental, e recentemente, um problema fez com que alguns usuarios sumissem da base de dados do bot. Então caso seu nivel não esteja como era a 1 semana atrás, pedimos desculpas pelo inconveniente.",
            value: "♻ Update ➔ `Metodo de ganho de XP nerfado.`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Foi recém adicionado o sistema de Boost para auxiliar no ganho de XP.",
            value: "✅ System XPBoost ➔ `Trabalhará junto com as insignias.`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "E até que enfim foi adicionado o sistema de Insignias, que auxiliará no ganho de XP, Dinheiro e funcionalidades exclusivas enquanto determinada insignia estiver equipada.",
            value: "✅ System Insignias ➔ `Experimental`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Agora será informado no profile do usuario quanto de Boost está sendo fornecido para ele em relação as insignias equipadas.",
            value: "♻ Update ➔ `.profile`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Caso queria ter mais informações sobre as insignias, poderá usar o novo comando `.insignia` para isso.",
            value: "✅ Command Added ➔ `.insignia`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "E sabendo das informações de determinada insignia, poderá também equipa-la em seu perfil caso tenha ela em seu inventario.",
            value: "✅ Command Added ➔ `.useinsignia`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "**│ ➤ Nos vemos no proximo patch 💜 ➤ │**",
            value: `Version ${version}`,
          }
        );

      const pages: MessageEmbed[] = [
        developerMessage,
        updateEmbed
      ];
      const button1: MessageButton = new MessageButton()
        .setCustomId("previousbtn")
        .setLabel("《")
        .setStyle("DANGER");
      const button2: MessageButton = new MessageButton()
        .setCustomId("nextbtn")
        .setLabel("》")
        .setStyle("SUCCESS");

      const buttonList: MessageButton[] = [button1, button2];
      const timeout: string = "120000";

      Pagination(message, pages, buttonList, timeout);
    } catch (error) {
      await message.react("❌");
      console.log(error);
    }
  },
};
