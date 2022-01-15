import ExtendedClient from "../../Client";
import { Command } from "../../interfaces"
import { CheckRole, EmbedTemplates } from "../../../lib/modules";
import {
  Collection,
  GuildBan,
  Message,
  MessageEmbed,
  User,
} from "discord.js";

export const command: Command = {
  name: "unban",
  aliases: ["ub", "desbanir"],
  description: "Comando para desbanir usuarios.",
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      //*1 Verificando se o usuario tem o cargo necessario para usar esse comando
      const Embeds = new EmbedTemplates(client);
      const authorRoleCheck: CheckRole = new CheckRole(client, message.member);

      if (!authorRoleCheck.CheckHighRoleBool())
        return message.channel.send({
          embeds: [Embeds.userCannotBePunished()],
        });

      //*2 Criando uma variavel com as informações do membro, e logo abaixo, verificando se o usuario não digitou o membro errado e se o membro pode ser punido.
      var person: User;

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
                "Foi encontrado, no comando de desbanir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
                "unban",
                [
                  {
                    name: ":purple_square:  Desbanir por ID | ",
                    value: "`.unban 261945904829956097 Regra[1]`",
                  },
                ]
              ),
            ],
          });
        }
      } else {
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de desbanir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "unban",
              [
                {
                  name: ":purple_square:  Desbanir por ID | ",
                  value: "`.unban 261945904829956097 Regra[1]`",
                },
              ]
            ),
          ],
        });
      }
      //*3 Armazenando o motivo em uma variavel caso tenha.

      let reason: string = message.content.split(" ").splice(2).join(" ");
      if (reason === "") reason = "Indefinido";

      //*4 Procurando pelo usuario banido, e se o usuario realmente estiver banido, o mesmo será desbanido logo em seguida.
      //Procurando todos os bans presentes no servidor e armazenando eles numa vairavel.
      const banList: Collection<string, GuildBan> =
        await message.guild.bans.fetch();
      const bannedUser: GuildBan = banList.get(person.id);

      let userIsNotBan: MessageEmbed = new MessageEmbed()
        .setColor("#5dd408")
        .setTitle("**Esse usuario não está banido**");

      if (!bannedUser) return message.channel.send({ embeds: [userIsNotBan] });
      await message.guild.members.unban(person, reason);
      message.react("✅").then(() => setTimeout(() => {if(message.deletable) message.delete()}, 5000));
      //TODO: Criar um embed final.
    } catch (error) {
      await message.react("❌");
      console.log(`${error}`);
    }
  },
};
