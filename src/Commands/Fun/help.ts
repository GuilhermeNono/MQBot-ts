import ExtendedClient from "../../Client/index.js";
import { Command } from "../../interfaces/index.js"
import { version } from "../../../package.json";
//@ts-ignore
import Pagination from "discordjs-button-pagination";
import {
  Message,
  MessageButton,
  MessageEmbed,
} from "discord.js";

export const command: Command = {
  name: "help",
  aliases: ["hp", "ajuda"],
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      const developerMessage: MessageEmbed = new MessageEmbed()
        .setTitle("**Ajuda ➔**")
        .setAuthor({
          name: message.client.user.username,
          iconURL: `${message.client.user.avatarURL()}`,
        })
        .setColor("#8e3deb")
        .setThumbnail(
          "https://media.discordapp.net/attachments/776094611470942208/885266085979512902/exclamation-xxl.png"
        )
        .setDescription(
          " Olá sou seu bot focado na administração desse servidor. Eu ainda estou em desenvolvimento então erros ou bugs inesperados podem acontecer, no entanto, se caso acontecer, contate o desenvolvedor do bot."
        )
        .addField("Desenvolvedor 🠗 ", `"Discord.#4953"`);
      const helpEmbed: MessageEmbed = new MessageEmbed()
        .setAuthor({
          name: `${message.client.user.username} ➔ Ajuda 🔰🔰`,
          iconURL: `${message.client.user.avatarURL()}`,
        })
        .setColor("#ff57fc")
        .setDescription(
          `Olá ${message.author.username}, Logo abaixo, estão listadas todas as minhas funcionalidades. Qualquer tipo de duvida, entre em contato com os moderadores ou com o Desenvolvedor do bot.`
        )
        .addFields(
          { name: "**│ 🡻 Administração 🡻 │**", value: "\u200b" },
          {
            name: "Comando para banir usuarios por tempo indeterminado.",
            value: "`.ban {user✅} {reason❌}`",
          },
          {
            name: "Comando para expulsar usuarios(usuarios expulsos podem voltar ao servidor).",
            value: "`.kick {user✅} {reason❌}`",
          },
          {
            name: "Comando para deixar o usuario mutado por tempo **ilimitado**.",
            value: "`.mute {user✅} {reason❌}`",
          },
          {
            name: "Comando para banir usuarios por tempo **determinado**.",
            value: "`.tempban {user✅} {time✅} {reason❌}`",
          },
          {
            name: "Comando para deixar o usuario mutado por tempo **limitado**.",
            value: "`.tempmute {user✅} {time✅} {reason❌}`",
          },
          {
            name: "Comando para retirar o Ban de um usuario.",
            value: "`.unban {user✅} {reason❌}`",
          },
          {
            name: "Comando para retirar o Mute de um usuario.",
            value: "`.unmute {user✅} {reason❌}`",
          },
        //   {
        //     name: "Informa o tempo restante até acabar a punição do usuario.",
        //     value: "`.timeleft {user❌}`",
        //   },
        //   {
        //     name: 'Comando que envia uma marcação para o usuario "@Fuzii"',
        //     value: "`.fuzi {on/off❌}`",
        //   },
          {
            name: "Comando para mostrar o perfil do usuario.",
            value: "`.profile {user❌}`",
          },
          { name: "Comando para limpar o chat.", value: "`.clear {number✅}`" },
          { name: "\u200b", value: "\u200b" },
          {
            name: "**│ 🡻 Parametros obrigatórios e opcionais 🡻 │**",
            value:
              "`✅` ➟ Preenchimento Obrigatório; `❌` ➟ Preenchimento Opcional;",
          },
          //➤
          {
            name: "**│ ➤ Comando para bufadores ➤ │**",
            value: `Version ${version}`,
          }
        );

      const boosterEmbed: MessageEmbed = new MessageEmbed()
        .setAuthor({
          name: `${message.client.user.username} ➔ Comando para bufadores 🎉🔰`,
          iconURL: `${message.client.user.avatarURL()}`,
        })
        .setColor("#9b61ff")
        .setDescription(
          `Já ouviu falar dos comandos exclusivos para bufadores, ${message.author.username}? Não seja por isso, aqui estão alguns deles:`
        )
        .addFields(
          { name: "**│ 🡻 BUFADORES 🡻 │**", value: "\u200b" },
          {
            name: "Help exclusivo com os comandos dos bufadores.",
            value: "`.bufador",
          },
          {
            name: "Cria um novo canal com seu id registrado.",
            value: "`.createchannel {name✅}`",
          },
          {
            name: "Deleta o canal com seu id registrado.",
            value: "`.deletechannel`",
          },
          {
            name: "renomeia o canal com seu id registrado.",
            value: "`.renamechannel {name✅}`",
          },
          {
            name: "Adiciona um novo usuario ao canal com seu id registrado.",
            value: "`.useradd {user✅}`",
          },
          {
            name: "Remove um usuario do canal com seu id registrado.",
            value: "`.userdelete {user✅}`",
          },
          { name: "\u200b", value: "\u200b" },
          {
            name: "**│ 🡻 OBSERVAÇÃO 🡻 │**",
            value:
              "`Lembrando que toda 00:xx são re-inteirados 2 mutes para cada bufador do servidor; Para os membros que usavam os apelidos para os comandos(.useradd -> .ua) o comando funcionará normalmente independente dos metodos usados.`",
          },
          {
            name: "**│ ➤ Como usar os parâmetros ➤ │**",
            value: `Version ${version}`,
          }
        );

      const parametersEmbed: MessageEmbed = new MessageEmbed()
        .setAuthor({
          name: `${message.client.user.username} ➔ Parâmetros dos comandos`,
          iconURL: `${message.client.user.avatarURL()}`,
        })
        .setColor("#fcdb03")
        .setDescription(
          `Para usar o bot adequadamente, é preciso saber como preencher os parâmetros, ${message.author.username}. Aqui está uma aulinha rapida:`
        )
        .addFields(
          { name: "**│ 🡻 Parametros 🡻 │**", value: "\u200b" },
          {
            name: ":grey_exclamation: {user}",
            value: "`@Discord ou 261945904829956097(ID do usuario)` 🡻",
          },
          {
            name: ":grey_exclamation: {time}",
            value:
              "`(s ➟ seconds; m ➟ minutes; h ➟ hour; d ➟ days) Exemplo: 1h; 10m; 24d(1 hora, 10 minutos e 24 dias)` 🡻",
          },
          {
            name: ":grey_exclamation: {reason}",
            value: "`Banido por inflingir a Regra[1]`",
          },
          {
            name: ":grey_exclamation: {name}",
            value: "`Qualquer palavra, frases, numeros ou emojis`",
          },
          {
            name: ":grey_exclamation: {number}",
            value: "`Apenas numeros que sejam positivo e inteiro`",
          },
          {
            name: "🡲 Qualquer dúvida, favor entrar em contato com Discord#4953 🡰",
            value: `Version ${version}`,
          }
        );

      const pages: MessageEmbed[] = [
        developerMessage,
        helpEmbed,
        boosterEmbed,
        parametersEmbed,
      ];
      const button1: MessageButton = new MessageButton()
        .setCustomId("previousbtn")
        .setLabel("《")
        .setStyle("DANGER");
      const button2: MessageButton = new MessageButton()
        .setCustomId("nextbtn")
        .setLabel("》")
        .setStyle("SUCCESS");

      const buttonList:MessageButton[] = [button1, button2];
      const timeout:string = "120000";

      Pagination(message, pages, buttonList, timeout);
      //TODO: Colocar os botoes.
    } catch (error) {
      await message.react("❌");
      console.log(error);
    }
  },
};
