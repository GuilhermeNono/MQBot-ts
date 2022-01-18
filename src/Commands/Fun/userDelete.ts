import ExtendedClient from "../../Client/index";
import { UserBoostModel } from "../../../models/index";
import {
  CheckRole,
  Databases,
  EmbedTemplates,
} from "../../../lib/modules/index";
import { Command } from "../../interfaces/index";
import {
  GuildBasedChannel,
  GuildMember,
  Message,
  MessageEmbed,
} from "discord.js";

export const command: Command = {
  name: "userdelete",
  aliases: ["ud", "deletarusuario"],
  description: "Remove um usuario do canal com seu id registrado.",
  run: async (
    client: ExtendedClient,
    message: Message<boolean>,
    args: string[]
  ) => {
    try {
      //#region Embed/string[]

      let missingPermission: MessageEmbed = new MessageEmbed()
        .setColor("#7b5bfc")
        .setTitle("**Você não tem permissão para usar esse comando.**")
        .setFooter({ text: "Permissão nivel Bufador." });

      let maxChannel: MessageEmbed = new MessageEmbed()
        .setColor("#552bff")
        .setTitle("❌ Você não tem canais disponiveis ❌")
        .setDescription(
          "Você não tem nem um servidor registrado com seu id. Por favor, use .createchannel(ou .cc) para criar um novo canal."
        );

      const levelBooster: string[] = [
        "929426173673500673", //"Fei" > brioco
        "929777206631223346", //"Bufador" > brioco
        "929418031795408916", //"ADM" > brioco
      ];
      //#endregion
      //* 1 Checando se o usuario tem pelo menos uma das roles informadas abaixo.
      const Embeds: EmbedTemplates = new EmbedTemplates(client);
      const checkAuthorBooster: CheckRole = new CheckRole(
        client,
        message.member,
        levelBooster
      );

      if (!checkAuthorBooster.CheckReturnBoolean())
        return message.channel.send({ embeds: [missingPermission] });

      //*2 Pegando as informações do usuario informado
      //Checando se o argumento foi uma marcação.
      let personCheck: Boolean = message.mentions.users.first() === undefined;

      //Checando se o argumento é um parametro vazio.
      if (args[0] === undefined || "")
        return message.channel.send({
          embeds: [
            Embeds.errorCode(
              "Usuario Invalido.",
              "Foi encontrado, no comando de remover usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "userdelete",
              [
                {
                  name: ":purple_square:  Remover usuario por Menção | ",
                  value: "`.userdelete @Discord`",
                },
                {
                  name: ":purple_square:  Remover usuario por ID | ",
                  value: "`.userdelete 261945904829956097`",
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
              "Foi encontrado, no comando de remover usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
              "userdelete",
              [
                {
                  name: ":purple_square:  Remover usuario por Menção | ",
                  value: "`.userdelete @Discord`",
                },
                {
                  name: ":purple_square:  Remover usuario por ID | ",
                  value: "`.userdelete 261945904829956097`",
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
                "Foi encontrado, no comando de remover usuarios, um erro de Sintaxe. Caso esteja com duvidas de como usar, por favor, siga as instruções abaixo: ",
                "userdelete",
                [
                  {
                    name: ":purple_square:  Remover usuario por Menção | ",
                    value: "`.userdelete @Discord`",
                  },
                  {
                    name: ":purple_square:  Remover usuario por ID | ",
                    value: "`.userdelete 261945904829956097`",
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
      //*3 Enviando uma mensagem de Loading até que todas as informações estejam carregadas
      let embedLoading: MessageEmbed = new MessageEmbed()
        .setColor("#8f73ff")
        .setTitle("Carregando...");

      message.channel.send({ embeds: [embedLoading] }).then(async (loading) => {
        //* 4 Checando se o usuario já não tem canais registrados em seu id

        let channelExistCheck: GuildBasedChannel;

        let userBooster = await UserBoostModel.findOne({
          userId: message.author.id,
        }).exec();
        let numberChannels: Number;
        if (userBooster === null) {
          const userBoosterdb: boolean = await new Databases().UserBoost(
            message.author.id
          );
          if (!userBoosterdb) throw "Erro ao criar o BDD dos bufadores.";
          numberChannels = 0;
        } else {
          channelExistCheck = message.guild.channels.cache.get(
            userBooster.idChannel
          );
          if (!channelExistCheck) {
            numberChannels = 0;
          } else {
            numberChannels = userBooster.numberChannel;
          }
        }

        if (numberChannels === 0)
          return message.channel
            .send({ embeds: [maxChannel] })
            .then(async (m) => {
              setTimeout(() => {
                if (m.deletable) m.delete();
              }, 15000);
              if (loading.deletable) await loading.delete();
            });

        if (!channelExistCheck) {
          await UserBoostModel.findOneAndUpdate(
            { userId: message.author.id },
            { $set: { numberChannel: 0, idChannel: "123" } }
          );
        }

        //* 5 Registrando a categoria que os canais de bufadores ficam
        if (channelExistCheck.type === "GUILD_VOICE") {
          await channelExistCheck.permissionOverwrites.edit(person.id, {
            SPEAK: false,
            CONNECT: false,
          });
        }

        if (loading.deletable) await loading.delete();
        let userlDeleteSucess: MessageEmbed = new MessageEmbed()
          .setTitle("**⭕ Usuario Removido ⭕**")
          .setAuthor({
            name: `Peach`,
            iconURL:
              "https://media.discordapp.net/attachments/776094611470942208/846246640867737610/peach_san.png",
          })
          .setColor("#a142f5");

        message.channel.send({ embeds: [userlDeleteSucess] }).then((msg) =>
          setTimeout(() => {
            if (msg.deletable) msg.delete();
          }, 15000)
        );
      });
    } catch (error) {
      console.log(error);
    }
  },
};
