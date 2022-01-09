import { Command } from "@Interface";
import { CheckRole, EmbedTemplates, Timer, mTimer } from "@Modules";
import {
  Collection,
  GuildChannel,
  GuildMember,
  Role,
  User,
  MessageEmbed,
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
      const Embeds: EmbedTemplates = new EmbedTemplates(client);
      const checkReturn: Boolean = newCheckAuthor.CheckReturnBoolean();
      if (!checkReturn)
        return message.channel.send({ embeds: [Embeds.userCannotBeBan()] });

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
          message,
          listOfAllowedRoles,
          person
        );

        if (newCheckPerson.CheckReturnBoolean())
          return message.channel.send({ embeds: [Embeds.userCannotBeBan()] });
      } else {
        return console.log("Esse usuario não está no servidor.");
      }

      //*3 Criando uma variavel que armazene o motivo.

      let reason: string = message.content.split(" ").splice(2).join(" ");
      if (reason === "") reason = "Indefinido";

      //*3.5 Criando variavel que armezene o tempo da punição.

      //Definindo que o index 1 do array como o tempo.
      let time: number = ms(args[1]);

      if(!time) return message.channel.send("Tempo invalido.");

      //*4 Criando, definindo a posição do cargo na hierarquia e setando para cada canal do servidor a devida permissão do cargo.

      //Procurando o cargo no servidor.
      let muteRole: Role = message.guild.roles.cache.find(
        (role: Role) => role.name === "Muted"
      );

      //Procurando a quantidade de cargos no servidor.
      let cargos: number = await message.guild.roles
        .fetch()
        .then((roles: Collection<string, Role>) => {
          return roles.size;
        });

      //Subtraindo 2 posições na hierarquia de cargos.
      cargos -= 4;

      //Criando/setando o cargo "Muted" nos canais do servidor.
      if (!muteRole) {
        await message.guild.roles
          .create({
            name: "Muted",
            reason:
              "Cargo para os mutados, quem tiver esse cargo não consegue enviar mensagens.",
            permissions: ["VIEW_CHANNEL"],
            position: cargos,
            mentionable: false,
          })
          .then((newRole: Role) => {
            message.guild.channels.cache.each((channels: GuildChannel) => {
              channels.permissionOverwrites.edit(newRole.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
            muteRole = newRole;
          });
      } else {
        message.guild.channels.cache.each((channels: GuildChannel) => {
          channels.permissionOverwrites.edit(muteRole.id, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
          });
        });
      }

      //*5 Adicionando o cargo de "Muted" no usuario mutado e criando os templates para as punições

      //Checando se o usuario já está mutado.
      const personAlreadyMuted: CheckRole = new CheckRole(
        message,
        [muteRole.id],
        person
      );

      if (personAlreadyMuted.CheckReturnBoolean())
        return message.channel.send("Esse usuario já está mutado.");

      //Adicionando o cargo "Muted" no usuario.
      await person.roles.add(muteRole);

      //*6 Setando os canais publicos e privados, e por ultimo, adicionando um teporizador para retirar o cargo de "Muted" depois de um certo tempo.

      //Setando o timer e armazenando na memoria temporaria do sistema a classe do timer com o id do usuario.
      let userTimer:Timer= new Timer(() => {

        //Esse escopo será executado quando o tempo do timer se esgotar.
        try {
          //@ts-expect-error
          person.roles.remove(muteRole);
          mTimer.delete(person.id);
        } catch (e) {
          console.log(`${e}`);
        }
        
      }, time);
      userTimer.start();
      mTimer.set(person.id, userTimer);

      let embedPub: MessageEmbed = new MessageEmbed()
        .setTitle("titulo")
        .setThumbnail(
          "https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/46-512.png"
        )
        .setDescription(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, lorem ut commodo suscipit, massa augue finibus mi, vel viverra ex ex a justo. Sed id nunc non neque fermentum viverra."
        )
        .setFooter("Discord.", message.author.avatarURL());


      //929426733516615781 idPunições > Canal Privado(Apenas moderação terá acesso)
      //929441854469070949 Punições > Canal Publico(Todos terão acesso)

      //TODO: PEDIR PRA ALGUEM FAZER OS EMBEDS.

      message.channel.send({ embeds: [embedPub] });

    } catch (error) {
      console.log(error);
    }
  },
};
