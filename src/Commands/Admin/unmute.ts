import { Command } from "@Interface";
import { CheckRole, EmbedTemplates } from "@Modules";
import { GuildMember, Role, User } from "discord.js";

export const command: Command = {
  name: "unmute",
  aliases: ["um", "desmutar"],
  description: "Comando para retirar o Mute de um usuario.",
  run: async (client, message, args) => {
    try {
      //*1 Verificando se o usuario tem o cargo necessario para usar esse comando
      const Embeds = new EmbedTemplates(client);
      const authorRoleCheck: CheckRole = new CheckRole(message, message.member);

      if (!authorRoleCheck.CheckHighRoleBool())
        return message.channel.send({ embeds: [Embeds.userCannotBeBan()] });

      //*2
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

      let person: GuildMember;

      //Checando se o argumento informado é igual a um numero.
      if (!isNaN(parseInt(args[0]))) {
        //Checando se contem alguma letra em meio aos numeros.
        try {
          person = message.guild.members.cache.find(
            (memberID) => memberID.id === args[0]
          );
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

      if (!person) return message.channel.send("Usuario inexistente");

      //*3 Armazenando o motivo em uma variavel caso tenha.

      let reason: string = message.content.split(" ").splice(2).join(" ");
      if (reason === "") reason = "Indefinido";

      //*4 Impedindo com que o author da mensagem se desmute.

      if (person.id === message.author.id)
        return message.channel.send({ embeds: [Embeds.autoBan()] });

      //*5 Checando se o usuario foi mutado temporariamente pelo "timeout()" ou sem tempo definido pelo "cargo muted".

      let muteRole: Role = message.guild.roles.cache.find(
        (role: Role) => role.name === "Muted"
      );

      //Checando se o usuario tem o cargo muted em seu usuario
      const checkMuteRole: CheckRole = new CheckRole(message, person, [
        muteRole.id,
      ]);

      //Caso tenha, quer dizer que ele foi mutado pelo .mute
      if (checkMuteRole.CheckReturnBoolean()) {
        await person.roles.remove(muteRole);
        await message.react("✅");
      } else {
        //Caso contrario, quer dizer que ele foi mutado pelo .tempmute
        await person.timeout(null);
        await message.react("✅");
      }
    } catch (error) {
      console.log(`${error}`);
    }
  },
};
