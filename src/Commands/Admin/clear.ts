import { Command } from "@Interface";
import { CheckRole, EmbedTemplates } from "@Modules";
import {
  Collection,
  GuildMember,
  Message,
  Role,
  TextChannel,
  User,
} from "discord.js";

export const command: Command = {
  name: "clear",
  aliases: ["clean", "limpar"],
  description: "Comando para limpar o chat.",
  run: async (client, message, args) => {
    try {
      //*1 Checando se o usuario tem permissão para limpar o char
      const rolesAgree: string[] = [
        "929426173673500673", //"Fei" > brioco
        "929418031795408916", //"ADM" > brioco
      ];

      const authorHighRole: CheckRole = new CheckRole(
        message,
        message.member,
        rolesAgree
      );

      const Embeds: EmbedTemplates = new EmbedTemplates(client);
      if (!authorHighRole.CheckReturnBoolean())
        return message.channel.send({ embeds: [Embeds.missingPermission()] });

      //TODO: 2 Criando uma variavel para armazenar a quantidade de mensagens a serem apagadas

      if (!args[0]) return message.channel.send({ embeds: [] });
      if (!parseInt(args[0]))
        return message.channel.send("isso não é um numero.");
      let qtd: number = parseInt(args[0]);

      if (qtd >= 100 || qtd < 0)
        return message.channel.send(
          "O numero n pode ser negativo ou maior que 99"
        );

      //TODO: 3 Armazenando as mensagens referente a variavel qtd
      const fetched: Collection<
        string,
        Message<boolean>
      > = await message.channel.messages.fetch({ limit: qtd + 1 });
      //TODO: 4 Apagando "qtd" mensagens do canal e enviando uma confirmação ou erro

      //Checando se existe mensagens para serem excluidas.
      if (fetched) {
          //Checando se o canal que será ecluida as mensagens é um canal de texto de servidor.
        if (message.channel.type === "GUILD_TEXT") {
            //Deletando "fetched" mensangens
          message.channel.bulkDelete(fetched).then(async () => {
              //Checando se foi informado um numero maior ou menos que 1
            if (qtd <= 1) {
                //Colocando a mensagem no singular caso seja apenas uma mensagem a ser excluida.
                const msg:Message<boolean> = await message.channel.send(`${qtd} mensagem foi excluida! ✅`);
                setTimeout(() => {
                    msg.delete();
                }, 5000);;
            } else {
                //Colocando a mensagem no plural caso sejam varias mensagens a serem excluidas.
                const msg_1:Message<boolean> = await message.channel.send(`${qtd} mensagens foram excluidas! ✅`);
                setTimeout(() => {
                    msg_1.delete();
                }, 5000);
            }
          }).catch(() => {
              //Caso a exclusão das mensagens dê erro, isso pode significar que, as mensagens a serem excluidas tem 14 dias de tempo de envio.
              return message.channel.send("Não é possivel excluir mensagens de até 14 dias.")
          })
        }
      }
    } catch (error) {
      await message.react("❌")
      console.log(`${error}`);
    }
  },
};
