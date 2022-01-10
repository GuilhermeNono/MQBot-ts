import { Command } from "@Interface";
import { CheckRole, EmbedTemplates, mTimer, Timer } from "@Modules";
import {
  Collection,
  GuildBan,
  GuildMember,
  Message,
  MessageEmbed,
  User,
} from "discord.js";
import ms from "ms";

export const command: Command = {
  name: "tempban",
  aliases: ["tb", "banirtemporario"],
  description: "Comando para banir usuarios por tempo determinado.",
  run: async (client, message, args) => {
    try {
      //PS: Inicializando os Embeds Templates.
      const Embeds: EmbedTemplates = new EmbedTemplates(client);

      //*1 - Verificando se o usuario tem o cargo necessario para usar esse comando

      const memberAuthor: GuildMember = message.member;
      
      const newCheckAuthor: CheckRole = new CheckRole(
        message,
        memberAuthor,
      );
      const checkReturn: Boolean = newCheckAuthor.CheckHighRoleBool();

      if (!checkReturn)
        return message.channel.send({ embeds: [Embeds.missingPermission()] });

      //*2 - Checando se o usuario foi mencionado; Checando se foi passado um parametro de texto ou não; Checando se o usuario existe

      //Checando se o argumento foi uma marcação.
      let personCheck: Boolean = message.mentions.users.first() === undefined;

      //Checando se o argumento é um parametro vazio.
      if (args[0] === undefined || "")
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "tempban",
              [
                {
                  name: ":purple_square:  Banir temporariamente por Menção | ",
                  value: "`.ban @Discord 1h Regra[1]`",
                },
                {
                  name: ":purple_square:  Banir temporariamente por ID | ",
                  value: "`.ban 261945904829956097 1h Regra[1]`",
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
              "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "tempban",
              [
                {
                  name: ":purple_square:  Banir temporariamente por Menção | ",
                  value: "`.ban @Discord 1h Regra[1]`",
                },
                {
                  name: ":purple_square:  Banir temporariamente por ID | ",
                  value: "`.ban 261945904829956097 1h Regra[1]`",
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
          person = await client.users.fetch(args[0]);
        } catch {
          return message.channel.send({
            embeds: [
              Embeds.errorCode(
                "Usuario Invalido.",
                "Foi encontrado, no comando de banir usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
                "tempban",
                [
                  {
                    name: ":purple_square:  Banir temporariamente por Menção | ",
                    value: "`.tempban @Discord 1h Regra[1]`",
                  },
                  {
                    name: ":purple_square:  Banir temporariamente por ID | ",
                    value: "`.tempban 261945904829956097 1h Regra[1]`",
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

      //*3 - Impedindo com que o usuario tente banir a si mesmo
      if (person.id === message.author.id)
        return message.channel.send({ embeds: [Embeds.autoBan()] });

      //*4 - Impedindo com que o usuario tente banir alguem com cargo superior ou equivalente ao seu

      /**
       * Checando se o tipo do usuario é diferente de "User".
       *
       * person: GuildMember = Está presente no servidor;
       * person: User = Não está presente no servidor.
       *
       */

      if (!(person instanceof User)) {
        const newCheckPerson: CheckRole = new CheckRole(
          message,
          person,
        );

        if (newCheckPerson.CheckHighRoleBool())
          return message.channel.send({ embeds: [Embeds.userCannotBeBan()] });
      }

      // *5 - Armazenando o "motivo" da punição

      let reason: string = message.content.split(" ").splice(3).join(" ");
      if (reason === "") reason = "Indefinido";

      //*5.5 - Armazenando o tempo da punição

      //Definindo que o index 1 do array como o tempo.
      let time: number = ms(args[1]);

      if (!time) return message.channel.send("Tempo invalido.");

      // *6 - Checando se o usuario já foi banido
      //Procurando todos os bans presentes no servidor e armazenando eles numa vairavel.
      let guildBans: Collection<string, GuildBan> =
        await message.guild.bans.fetch();

      //Checando se não existe nem um usuario banido no servidor.
      if (guildBans.size === 0) {
        await BanPerson(message, person, time, reason);
      } else {
        //Se existir, checando se o id de pelo menos um desses usuario é igual ao do "person".
        if (guildBans.findKey((userBan) => userBan.user.id === person.id)) {
          return message.react("❌");
        } else {
          //Caso esse usuario não esteja na lista de banidos, efetuamos o banimento.
          await BanPerson(message, person, time, reason);
        }
      }
    } catch (error) {
      console.log(`${error}`);
    }
  },
};

//Função para banir e criar o temporizador.
async function BanPerson(
  message: Message,
  person: GuildMember | User,
  time: number,
  reason: string,
  days: number = 0
) {
  try {
    //Criando o temporizador e iniciando-o.
    const newTimer = new Timer(async () => {
      await message.guild.members.unban(person, "Tempo de punição finalizado.");
      //Removendo o usuario da memoria temporaria do bot quando o tempo acabar.
      mTimer.delete(person.id);
    }, time);
    newTimer.start();

    //Setando na memoria temporaria do bot.
    mTimer.set(person.id, newTimer);

    //Banindo o usuario.
    await message.guild.members.ban(person, {
      reason: `${reason}`,
      days: days,
    });

    await message.react("☑️");
  } catch (error) {
    console.log(`${error}`);
  }
}
