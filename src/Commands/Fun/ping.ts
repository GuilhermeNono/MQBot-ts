import ExtendedClient from "../../Client/index";
import { Command } from "../../interfaces/index";
import { Message, MessageEmbed } from "discord.js";

export const command: Command = {
  name: "ping",
  aliases: ["pg"],
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      //929428196313669692
      // return message.channel.send("pong🏓");
      const reportChannel =
        message.guild.channels.cache.get("933066526741893160");
      const embedfoda = new MessageEmbed()
        .setTitle("🎮 **| Guia Do Bot De Economia |** 🎮")
        .setDescription("O prefixo dos comandos é: !")
        .addFields(
          { name: "Comandos importantes", value: "\u200b" },
          {
            name: "`!Work` | Trabalho que rende dinheiro.",
            value:
              "`!Crime` | Se comete um crime que rende dinheiro mas tem a chance de perder no processo.",
          },
          {
            name: "`!Slut ` | Se prostitui por dinheiro mas tem a chance de perder no processo.",
            value:
              "`!Rob {user}` | Rouba o dinheiro no cash da pessoa marcada.",
          },
          {
            name: "`!Dep-all` | Guarda o dinheiro no banco(Bank).",
            value: "`!With-all` | Saca o dinheiro no banco(Cash).",
          },
          {
            name: "`!Give-money` | Da dinheiro a outra pessoa.",
            value: "`!Leardboard` | Rank de quem tem mais dinheiro .",
          },

          {
            name: "`!Store` | Abre a loja.",
            value: "`!Inventory` | Abre seu inventário.",
          },
          {
            name: "`!Buy-item {item}` | Compra um item da loja.",
            value: "`!Sell-item | Vende um item do seu inventário.`",
          },
          {
            name: "`!Give-item` | Da um item do seu inventário a outra pessoa.",
            value: "\u200b",
          },

          { name: "Comandos de jogos", value: "\u200b" },

          {
            name: "`!Blackjack` | Inicia um jogo de blackjack.",
            value:
              "`!Cockfight` | Inicia uma rinha de galo se tiver um galinha no inventário.",
          },
          {
            name: "`Russian-roullete` | Inicia uma roleta russa com outras pessoas.",
            value:
              "`!roullete` | Rola a roleta podendo escolher uma cor ou número.",
          }
        )
        .setColor("BLURPLE");
      // .addField('**Não use a DM da staff para fazer esse report.**', "➔ Para começar seu ticket **envie uma mensagem nesse chat.**")
      // .setImage('https://images-ext-1.discordapp.net/external/DKgdhzySvU7vDfc-6SQ9GrSFhSzG4PERDmKvHCNp5Yk/https/images-ext-2.discordapp.net/external/BjCk723fesx1LOtbXJBpNutKfe4N9F5uIqoLKz2RAWs/https/pa1.narvii.com/6382/95f1350b84b53b202a558ad857d3cfe40a5bf2f0_hq.gif')
      // .setFooter({text:"Qual o problema? Vou anotar e resolver pra você. ❤"})
      // .setColor("AQUA")
      // .addField("\u200b", "**Oque você enviar aqui será apagado desse canal depois de computado, não se preocupe.**")
      if (reportChannel.type === "GUILD_TEXT") {
        reportChannel.send({ embeds: [embedfoda] });
      }
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
