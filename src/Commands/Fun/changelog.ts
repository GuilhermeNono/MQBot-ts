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
          `Atualização 4.2.0 entrou em vigor e, como novo recurso, o comando **.changelog** foi adicionado, ele mostra o que foi alterado no bot. 
          Enfim, o bot esteve em um momento de pausa de atualizações por diversos motivos, mas o importante é que sempre voltamos hora ou outra.
          E como prometido anteriormente, o Sistema de XP do bot já está PARCIAMENTE funcional, "Como assim parcialmente? 🤔"
          No servidor oficial do bot, foi anunciado e apresentado o escopo final do sistema, contudo algumas ideias foram deixadas para o proximo patch. 
          Além do sistema de XP parcialmente funcional, a funcionalidade de Mute temporario para bufadores, foi deixada também, para o proximo patch.`
        )
        .addField("Desenvolvedor 🠗 ", `"Discord.#4953"`);

      const updateEmbed: MessageEmbed = new MessageEmbed()
        .setAuthor({
          name: `${message.client.user.username} ➔ Update v${version} 🔰🔰`,
          iconURL: `${message.client.user.avatarURL()}`,
        })
        .setColor("#fc2626")
        .setDescription(
          `A atualização em si, não foi extremamente grande, como a passada. Porém, algumas alterações ocorreram e vamos cita-las abaixo:`
        )
        .addFields(
          { name: "**│ 🡻 Mudanças 🡻 │**", value: "\u200b" },
          {
            name: "Foi adicionado a tag `NEW` no comando `.help` para indicar novos comandos.",
            value: "✅ Tag `NEW` ➔ `.help`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Agora o comando `.convite` foi adicionado para informar o link do servidor Oficial do Brioco.",
            value: "✅ Command added `.convite`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Foi adicionado o comando `.server` que ira te redirecionar para o servidor do bot. O comando é um comando oculto, ou seja, não aparecerá no `.help`.",
            value: "✅ Command added `.server`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Enfim o sistema de XP entrou em vigor nessa atualização, será usado como fase experimental para testes. Caso tudo de certo, o sistema completo será incluido no proximo patch. (acumulem bastante xp 😉)",
            value: "✅ System XP ➔ `Experimental`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "O `.profile` foi atualizado e levemente alterado, para melhorar a experiência do usuário.",
            value: "♻ Update ➔ `.profile`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Agora, qualquer marcação nos usuarios `kojj`, `caiera` e/ou `felepe` será automaticamente excluida(exceção para moderadores e acima).",
            value: "✅ Auto-remove ➔ `kojj, caira, felepe`",
          },
          {
            name: "\u200b",
            value: "\u200b",
          },
          {
            name: "Banco de dados atualizado para suprir o novo sistema de XP",
            value: "♻ Update ➔ `Database`",
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
