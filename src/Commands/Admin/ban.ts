import { Command } from "@Interface";
import { CheckRole, EmbedTemplates } from "@Modules";
import {
  Collection,
  GuildBan,
  GuildMember,
  MessageEmbed,
  User,
} from "discord.js";

export const command: Command = {
  name: "ban",
  aliases: ["bn", "banir"],
  description: "Comando para banir usuarios por tempo indeterminado.",
  run: async (client, message, args) => {
    try {
      //PS: Inicializando os Embeds Templates.
      const Embeds: EmbedTemplates = new EmbedTemplates(client);

      //*1 - Verificando se o usuario tem o cargo necessario para usar esse comando

      const memberAuthor: GuildMember = message.member;
      const listOfAllowedRoles: string[] = [
        "929426173673500673", //Role "Fei" > brioco
        "929418031795408916", //Role "Adm" > brioco
        "929435905926791168", //Role "Mod" > brioco
        "735147189432483920", //Role "Zé" > Peach Server
        "716006513818468404", //Role "MACACOS" > Muquifo
        "716008029396533349", //Role "FUNAI" > Muquifo
        "731199687981400097", //Role "MOD" > Muquifo
      ];
      const newCheckAuthor: CheckRole = new CheckRole(
        message,
        listOfAllowedRoles,
        memberAuthor
      );
      const checkReturn: Boolean = newCheckAuthor.CheckReturnBoolean();

      if (!checkReturn)
        return message.channel.send({ embeds: [Embeds.missingPermission()] });

      //*2 - Checando se o usuario foi mencionado; Checando se foi passado um parametro de texto ou não; Checando se o usuario existe

      let personCheck: Boolean = message.mentions.users.first() === undefined;
      if (args[0] === undefined || "")
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "ban",
              [
                {
                  name: ":purple_square:  Banir por Menção | ",
                  value: "`.ban @Discord Regra[1]`",
                },
                {
                  name: ":purple_square:  Banir por ID | ",
                  value: "`.ban 261945904829956097 Regra[1]`",
                },
              ]
            ),
          ],
        });

      if (/^[a-zA-Z]+$/.test(args[0])) {
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "ban",
              [
                {
                  name: ":purple_square:  Banir por Menção | ",
                  value: "`.ban @Discord Regra[1]`",
                },
                {
                  name: ":purple_square:  Banir por ID | ",
                  value: "`.ban 261945904829956097 Regra[1]`",
                },
              ]
            ),
          ],
        });
      }

      var person: GuildMember | User;

      if (!isNaN(parseInt(args[0]))) {
        //.ban 123545678
        person = await client.users.fetch(args[0]);
      } else {
        person = personCheck
          ? message.guild.members.cache.get(args[0])
          : message.guild.members.cache.get(message.mentions.users.first().id);
      }

      if (!person) return message.channel.send("Usuario inexistente");

      //*3 - Impedindo com que o usuario tente banir a si mesmo
      if (person.id === message.author.id)
        return message.channel.send({ embeds: [Embeds.autoBan()] });

      //*4 - Impedindo com que o usuario tente banir alguem com cargo superior ou equivalente ao seu

      if (!(person instanceof User)) {
        const newCheckPerson: CheckRole = new CheckRole(
          message,
          listOfAllowedRoles,
          person
        );

        if (newCheckPerson.CheckReturnBoolean())
          return message.channel.send({ embeds: [Embeds.userCannotBeBan()] });
      }

      // *5 - Armazenando o "motivo" da punição

      let reason: string = message.content.split(" ").splice(2).join(" ");
      if (reason === "") reason = "Indefinido";

      // *6 - Checando se o usuario já foi banido
      let guildBans: Collection<string, GuildBan> =
        await message.guild.bans.fetch();

      if (guildBans.size === 0) {
        message.channel.send("Ninguem banido");
      } else {
        if (guildBans.findKey((userBan) => userBan.user.id === person.id)) {
          return message.react("❌");
        } else {
          // await message.guild.members.ban(person);
          message.channel.send("banido");
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
