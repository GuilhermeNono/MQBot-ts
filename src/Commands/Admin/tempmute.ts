import ExtendedClient from "../../Client/index";
import { Command } from "../../interfaces/index";
import { UserDataModel } from "../../../models/index";
import {
  CheckRole,
  EmbedTemplates,
  Databases,
} from "../../../lib/modules/index";
import {
  GuildMember,
  User,
  MessageEmbed,
  GuildBasedChannel,
  Message,
} from "discord.js";
//@ts-ignore
import ms from "ms";

export const command: Command = {
  name: "tempmute",
  aliases: ["tm"],
  description: "Comando para deixar o usuario mutado por tempo limitado.",
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      //*1 Verificando se o usuario tem o cargo necessario para usar esse comando
      const memberAuthor: GuildMember = message.member;

      const newCheckAuthor: CheckRole = new CheckRole(client, memberAuthor);
      const Embeds: EmbedTemplates = new EmbedTemplates(client);
      const checkReturn: Boolean = newCheckAuthor.CheckHighRoleBool();
      if (!checkReturn)
        return message.channel.send({
          embeds: [Embeds.userCannotBePunished()],
        });

      //*2 Puxando as informações do membro, verificando se o usuario não digitou errado e se o usuario pode ser punido.

      //Checando se o argumento foi uma marcação.
      let personCheck: Boolean = message.mentions.users.first() === undefined;

      //Checando se o argumento é um parametro vazio.
      if (args[0] === undefined || "")
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de mutar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "tempmute",
              [
                {
                  name: ":purple_square:  Mutar temporariamente por Menção | ",
                  value: "`.tempmute @Discord 1h Regra[1]`",
                },
                {
                  name: ":purple_square:  Mutar temporariamente por ID | ",
                  value: "`.tempmute 261945904829956097 1h Regra[1]`",
                },
              ]
            ),
          ],
        });

      //Checando se o argumento começa com letras.
      if (/^[a-zA-Z]+$/.test(args[0])) {
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de mutar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "tempmute",
              [
                {
                  name: ":purple_square:  Mutar temporariamente por Menção | ",
                  value: "`.tempmute @Discord 1h Regra[1]`",
                },
                {
                  name: ":purple_square:  Mutar temporariamente por ID | ",
                  value: "`.tempmute 261945904829956097 1h Regra[1]`",
                },
              ]
            ),
          ],
        });
      }

      let person: GuildMember | User;

      //Checando se o argumento informado é igual a um numero.
      if (!isNaN(parseInt(args[0]))) {
        //Checando se contem alguma letra em meio aos numeros.
        try {
          person = await client.users.fetch(args[0]);
        } catch {
          return message.channel.send({
            embeds: [
              Embeds.errorCode(
                "Usuario Invalido.",
                "Foi encontrado, no comando de mutar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
                "tempmute",
                [
                  {
                    name: ":purple_square:  Mutar temporariamente por Menção | ",
                    value: "`.tempmute @Discord 1h Regra[1]`",
                  },
                  {
                    name: ":purple_square:  Mutar temporariamente por ID | ",
                    value: "`.tempmute 261945904829956097 1h Regra[1]`",
                  },
                ]
              ),
            ],
          });
        }
      } else {
        person = personCheck
          ? message.guild.members.cache.get(args[0])
          : message.guild.members.cache.get(message.mentions.users.first().id);
      }

      if (!person)
        return message.channel.send({ embeds: [Embeds.UserNotExist()] });

      /**
       * Checando se o tipo do usuario é diferente de "User".
       *
       * person: GuildMember = Está presente no servidor;
       * person: User = Não está presente no servidor.
       *
       */
      if (!(person instanceof User)) {
        const newCheckPerson: CheckRole = new CheckRole(client, person);

        if (newCheckPerson.CheckHighRoleBool())
          return message.channel.send({
            embeds: [Embeds.userCannotBePunished()],
          });
      } else {
        let userOutOfServer: MessageEmbed = new MessageEmbed()
          .setColor("DARK_RED")
          .setTitle("Esse usuario não está no servidor.");
        return message.channel.send({ embeds: [userOutOfServer] });
      }

      //Impedindo com que o author da mensagem se auto-mute.
      if (person.id === message.author.id)
        return message.channel.send({ embeds: [Embeds.AutoMute()] });

      //*3 Criando uma variavel que armazene o motivo.

      let reason: string = message.content.split(" ").splice(3).join(" ");
      if (reason === "") reason = "Indefinido";

      //*3.5 Criando variavel que armezene o tempo da punição.

      //Checando o parametro de tempo foi informado.
      if (!args[1])
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de mutar usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "tempmute",
              [
                {
                  name: ":purple_square:  Mutar temporariamente por Menção | ",
                  value: "`.tempmute @Discord 1h Regra[1]`",
                },
                {
                  name: ":purple_square:  Mutar temporariamente por ID | ",
                  value: "`.tempmute 261945904829956097 1h Regra[1]`",
                },
              ]
            ),
          ],
        });

      //Definindo que o index 1 do array como o tempo.
      let time: number = ms(args[1]);
      let timeInvalid: MessageEmbed = new MessageEmbed()
        .setColor("DARK_RED")
        .setTitle("Tempo invalido.");
      if (!time) return message.channel.send({ embeds: [timeInvalid] });

      //*4 Adicionando o timeout ao usuario.

      // Checando se o usuario já está mutado.
      const personAlreadyMuted: boolean = person.isCommunicationDisabled();

      if (personAlreadyMuted) {
        let alreadyMuted: MessageEmbed = new MessageEmbed()
          .setColor("DARK_RED")
          .setTitle("Esse usuario já está mutado.");
        return message.channel.send({ embeds: [alreadyMuted] });
      }
      //Mutando o usuario.
      await person.timeout(time, reason);

      //*5 Setando os canasi publicos e privados.

      const publicChannel: GuildBasedChannel =
        message.guild.channels.cache.get("929441854469070949");
      const privateChannel: GuildBasedChannel =
        message.guild.channels.cache.get("929426733516615781");

      let gifEmbed: string =
        "https://i.pinimg.com/originals/5b/cf/8a/5bcf8ac9cf808f8004b3dc682c16541e.gif";

      if (
        publicChannel.type === "GUILD_TEXT" &&
        privateChannel.type === "GUILD_TEXT"
      ) {
        publicChannel
          .send({
            embeds: [
              Embeds.PublicDesc(
                message,
                reason,
                person,
                gifEmbed,
                "DARK_GREEN",
                args[1],
                "https://media.discordapp.net/attachments/776094611470942208/888406945139154985/J4Qb.gif"
              ),
            ],
          })
          .then(async () => {
            if (person instanceof GuildMember)
              privateChannel.send({
                embeds: [
                  Embeds.PrivateDesc(
                    message,
                    person,
                    reason,
                    "__TempMute__➟ 🟢",
                    args[1],
                    "DARK_GREEN"
                  ),
                ],
              });
            await message.react("✅");
          });
      }

      //* 6 Somando +1 no contador de mutes do usuario.

      try {
        let userDB = await UserDataModel.findOne({ userId: person.id }).exec();
        if (userDB === null) {
          return await new Databases().UserData(person.id);
        }

        let userCountMute: number = userDB.countMute + 1;

        await UserDataModel.findOneAndUpdate(
          { userId: person.id },
          { countMute: userCountMute }
        ).exec();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      await message.react("❌");
      console.log(error);
    }
  },
};
