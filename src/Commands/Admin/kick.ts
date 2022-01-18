import ExtendedClient from "../../Client/index";
import { Command } from "../../interfaces/index";
import { CheckRole, EmbedTemplates } from "../../../lib/modules/index";
import { GuildBasedChannel, GuildMember, Message } from "discord.js";

export const command: Command = {
  name: "kick",
  aliases: ["k", "kickar"],
  description: "Comando para limpar o chat.",
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      //* 1 Verificando se o usuario tem o cargo necessario para usar esse comando
      const authorHighRole: CheckRole = new CheckRole(client, message.member);
      const Embeds: EmbedTemplates = new EmbedTemplates(client);

      if (!authorHighRole.CheckHighRoleBool())
        return message.channel.send({ embeds: [Embeds.missingPermission()] });

      //* 2 Pegando as informações do usuario

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

      if (!person)
        return message.channel.send({ embeds: [Embeds.UserNotExist()] });

      //* 3 Armazenando o motivo em uma variavel caso tenha.

      let reason: string = message.content.split(" ").splice(2).join(" ");
      if (reason === "") reason = "Indefinido";

      //* 4 Checando se o usuario pode ser kickado.

      const userKickable: CheckRole = new CheckRole(client, person);
      if (userKickable.CheckHighRoleBool())
        return message.channel.send({
          embeds: [Embeds.userCannotBePunished()],
        });

      //todo 5 Kickando o usuario.

      await person.kick(reason);
      //*6 Setando os canasi publicos e privados.

      const publicChannel: GuildBasedChannel =
        message.guild.channels.cache.get("929441854469070949");
      const privateChannel: GuildBasedChannel =
        message.guild.channels.cache.get("929426733516615781");

      let gifEmbed: string =
        "https://i.pinimg.com/originals/10/32/d5/1032d503ba62cc0de1e1e4e79b473547.gif";

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
                "YELLOW",
                "**:lock: Indeterminado**",
                "https://uploads.spiritfanfiction.com/fanfics/historias/202009/ta-um-calor-do-cao-20461617-110920201528.gif"
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
                    "__Kick__➟ 🟡",
                    "**:lock: Indeterminado**",
                    "YELLOW"
                  ),
                ],
              });
            await message.react("✅");
          });
      }
    } catch (error) {
      await message.react("❌");
      console.log(`${error}`);
    }
  },
};
