import { GuildMember, MessageEmbed, User } from "discord.js";
import { CheckRole, Databases, EmbedTemplates } from "../../../lib/modules";
import { UserDataModel, insigniaDataModel } from "../../../models";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "removeinsignia",
  aliases: ["removeins", "ri"],
  description: "remove uma insignia do inventario de um usuário.",
  run: async (client, message, args) => {
    //.giveinsignia @user 1 2
    try {
      //*1 Verificando se o usuario tem o cargo necessario para usar esse comando
      const memberAuthor: GuildMember = message.member;

      const rolesAdmin = ["929418031795408916", "929426173673500673"]
      const newCheckAuthor: CheckRole = new CheckRole(client, memberAuthor, rolesAdmin);
      const Embeds: EmbedTemplates = new EmbedTemplates(client);
      const checkReturn: Boolean = newCheckAuthor.CheckReturnBoolean();
      if (!checkReturn)
        return message.channel.send({
          embeds: [Embeds.missingPermission()],
        });

      //*2 Puxando as informações do membro, verificando se o usuario não digitou errado.

      //Checando se o argumento foi uma marcação.
      let personCheck: Boolean = message.mentions.users.first() === undefined;

      //Checando se o argumento é um parametro vazio.
      if (args[0] === undefined || "")
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de dar insignias, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "Give Insignia",
              [
                {
                  name: ":purple_square: Givar por menção | ",
                  value: "`.giveinsignia @Discord 1`",
                },
                {
                  name: ":purple_square:  Givar por ID | ",
                  value: "`.giveinsignia 261945904829956097 1`",
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
              "Foi encontrado, no comando de dar insignias, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "Give Insignia",
              [
                {
                  name: ":purple_square: Givar por menção | ",
                  value: "`.giveinsignia @Discord 1`",
                },
                {
                  name: ":purple_square:  Givar por ID | ",
                  value: "`.giveinsignia 261945904829956097 1`",
                },
              ]
            ),
          ],
        });
      }

      var person: GuildMember | User;

      //Checando se o argumento informado é igual a um numero.
      if (!isNaN(parseInt(args[0]))) {
        //Checando se contem alguma letra em meio aos numeros.
        try {
          //   person = await client.users.fetch(args[0]);
          person = await message.guild.members.fetch(args[0]);
        } catch {
          return message.channel.send({
            embeds: [
              Embeds.errorCode(
                "Usuario Invalido.",
                "Foi encontrado, no comando de dar insignias, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
                "Give Insignia",
                [
                  {
                    name: ":purple_square: Givar por menção | ",
                    value: "`.giveinsignia @Discord 1`",
                  },
                  {
                    name: ":purple_square:  Givar por ID | ",
                    value: "`.giveinsignia 261945904829956097 1`",
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

      const memberDB = await UserDataModel.findOne({
        userId: person.id,
        serverId: person.guild.id,
      }).exec();

      if (memberDB === null) {
        return await new Databases().UserData(person.id, person.guild.id);
      }

      let insignias: string | string[] = message.content
        .split(" ")
        .splice(2)
        .join(" ");
      if (insignias === "")
        return message.channel.send(
          `" .giveinsignia ${person.id} **➔${insignias}** " não é um parametro valido.`
        );

      insignias = insignias.split(" ");

      var insTest;
      let tests;

      insignias.forEach(async (ins) => {
        insTest = await insigniaDataModel.findOne({ insigniaID: ins }).exec();
        if (insTest === null)
          return message.channel.send(
            `" .giveinsignia ${person.id} **➔${ins}** " não é um parametro valido.`
          );

          

        if (memberDB.insigniaID.includes(parseInt(ins))) {
          const index = memberDB.insigniaID.indexOf(parseInt(ins));
          if (index > -1) {
            tests = memberDB.insigniaID.splice(index, 1); // 
          }
        }
      });

      console.log(tests)

      await message.react("✅");
      await memberDB.save();
    } catch (error) {
      console.log(error);
    }
  },
};
