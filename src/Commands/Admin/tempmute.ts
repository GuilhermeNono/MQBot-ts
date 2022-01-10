import { Command } from "@Interface";
import { CheckRole, EmbedTemplates, Timer, mTimer } from "@Modules";
import {
  Collection,
  GuildMember,
  Role,
  User,
  MessageEmbed,
  GuildBasedChannel,
  TextChannel,
} from "discord.js";
import ms from "ms";

export const command: Command = {
  name: "tempmute",
  aliases: ["tm"],
  description: "Comando para deixar o usuario mutado por tempo limitado.",
  run: async (client, message, args) => {
    try {
      //*1 Verificando se o usuario tem o cargo necessario para usar esse comando
      const memberAuthor: GuildMember = message.member;
      
      const newCheckAuthor: CheckRole = new CheckRole(
        client,
        memberAuthor,
      );
      const Embeds: EmbedTemplates = new EmbedTemplates(client);
      const checkReturn: Boolean = newCheckAuthor.CheckHighRoleBool();
      if (!checkReturn)
        return message.channel.send({ embeds: [Embeds.userCannotBePunished()] });

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

      if (!person) return message.channel.send("Usuario inexistente");

      /**
       * Checando se o tipo do usuario é diferente de "User".
       *
       * person: GuildMember = Está presente no servidor;
       * person: User = Não está presente no servidor.
       *
       */
      if (!(person instanceof User)) {
        const newCheckPerson: CheckRole = new CheckRole(
          client,
          person,
        );

        if (newCheckPerson.CheckHighRoleBool())
          return message.channel.send({ embeds: [Embeds.userCannotBePunished()] });
      } else {
        return console.log("Esse usuario não está no servidor.");
      }

      //Impedindo com que o author da mensagem se auto-mute.
      if(person.id === message.author.id) return message.channel.send("Está tentando se auto mutar.")

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

      if (!time) return message.channel.send("Tempo invalido.");

      //*4 Adicionando o timeout ao usuario.

      // Checando se o usuario já está mutado.
      const personAlreadyMuted: boolean = person.isCommunicationDisabled();

      if (personAlreadyMuted)
        return message.channel.send("Esse usuario já está mutado.");

      //Mutando o usuario.
      await person.timeout(time, reason);

      //*5 Setando os canais publicos e privados.

      let embedPub: MessageEmbed = new MessageEmbed()
        .setTitle("titulo")
        .setThumbnail(
          "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/46-512.png"
        )
        .setDescription(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, lorem ut commodo suscipit, massa augue finibus mi, vel viverra ex ex a justo. Sed id nunc non neque fermentum viverra."
        )
        .setFooter({ text: "Discord.", iconURL: message.author.avatarURL() });

      //929426733516615781 idPunições > Canal Privado(Apenas moderação terá acesso)
      //929441854469070949 Punições > Canal Publico(Todos terão acesso)

      //TODO: PEDIR PRA ALGUEM FAZER OS EMBEDS.

      message.channel.send({ embeds: [embedPub] });
    } catch (error) {
      await message.react("❌")
      console.log(error);
    }
  },
};
