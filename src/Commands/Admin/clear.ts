import ExtendedClient from "@Client";
import { Command } from "@Interface";
import { CheckRole, EmbedTemplates } from "@Modules";
import {
  Collection,
  GuildMember,
  Message,
  MessageEmbed,
  Role,
  TextChannel,
  User,
} from "discord.js";

export const command: Command = {
  name: "clear",
  aliases: ["cl", "clean", "limpar"],
  description: "Comando para limpar o chat.",
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      //*1 Checando se o usuario tem permissão para limpar o char
      const rolesAgree: string[] = [
        "929426173673500673", //"Fei" > brioco
        "929418031795408916", //"ADM" > brioco
      ];

      const authorHighRole: CheckRole = new CheckRole(
        client,
        message.member,
        rolesAgree
      );

      const Embeds: EmbedTemplates = new EmbedTemplates(client);
      if (!authorHighRole.CheckReturnBoolean())
        return message.channel.send({ embeds: [Embeds.missingPermission()] });

      //TODO: 2 Criando uma variavel para armazenar a quantidade de mensagens a serem apagadas

      if (!args[0]) return message.channel.send({ embeds: [] });
      if (!parseInt(args[0])) {
        let NaNEmbed: MessageEmbed = new MessageEmbed()
          .setColor("DARK_RED")
          .setTitle(`"${args[0]}" não é um numero.`);

        return message.channel.send({ embeds: [NaNEmbed] });
      }

      let qtd: number = parseInt(args[0]);

      if (qtd >= 100 || qtd < 0) {
        let numberGreaterThan99: MessageEmbed = new MessageEmbed()
          .setColor("DARK_RED")
          .setTitle("O numero não pode ser negativo ou maior que 99");
        return message.channel.send({ embeds: [numberGreaterThan99] });
      }
      //TODO: 3 Armazenando as mensagens referente a variavel qtd
      const fetched: Collection<
        string,
        Message<boolean>
      > = await message.channel.messages.fetch({ limit: qtd});
      //TODO: 4 Apagando "qtd" mensagens do canal e enviando uma confirmação ou erro

      
      //Checando se existe mensagens para serem excluidas.
      if (fetched) {
        //Checando se o canal que será ecluida as mensagens é um canal de texto de servidor.
        if (message.channel.type === "GUILD_TEXT") {
          //Deletando "fetched" mensangens

          let msgEmbed: MessageEmbed = new MessageEmbed().setColor("GREYPLE");

          if(message.deletable) await message.delete(); 

          message.channel
            .bulkDelete(fetched)
            .then(async () => {
              //Checando se foi informado um numero maior ou menos que 1
              if (qtd <= 1) {
                msgEmbed.setTitle(`${qtd} mensagem foi excluida! ✅`);
                //Colocando a mensagem no singular caso seja apenas uma mensagem a ser excluida.
                const msg: Message<boolean> = await message.channel.send({
                  embeds: [msgEmbed],
                });
                setTimeout(() => {
                  msg.delete();
                }, 5000);
              } else {
                msgEmbed.setTitle(`${qtd} mensagens foram excluidas! ✅`);
                //Colocando a mensagem no plural caso sejam varias mensagens a serem excluidas.
                const msg_1: Message<boolean> = await message.channel.send({
                  embeds: [msgEmbed],
                });
                setTimeout(() => {
                  msg_1.delete();
                }, 5000);
              }
            })
            .catch(() => {
              //Caso a exclusão das mensagens dê erro, isso pode significar que, as mensagens a serem excluidas tem 14 dias de tempo de envio.
              const errorDelete: MessageEmbed = new MessageEmbed()
                .setColor("DARK_RED")
                .setTitle("Não é possivel excluir mensagens de até 14 dias.");
              return message.channel.send({ embeds: [errorDelete] });
            });
        }
      }
    } catch (error) {
      await message.react("❌");
      console.log(`${error}`);
    }
  },
};
