import ExtendedClient from "@Client";
import { UserBoostModel } from "@Models";
import { CheckRole, Databases } from "@Modules";
import { Command } from "@Interface";
import { GuildBasedChannel, Message, MessageEmbed } from "discord.js";

export const command: Command = {
  name: "renamechannel",
  aliases: ["rc", "renomearcanal"],
  description: "Renomeia o canal com seu id registrado.",
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

      let missingName: MessageEmbed = new MessageEmbed()
        .setTitle(
          "**:bangbang: Por favor, insira um nome para seu canal :bangbang:**"
        )
        .setColor("#f55142")
        .addField(
          "Erro de sintaxe",
          "`Houve um erro de Sintaxe no comando, caso tenha duvida, siga a instrução abaixo:`"
        )
        .addField(
          "Exemplo de comando",
          "`.renamechannel Meu canal foda` ou `.rc Meu canal foda`"
        );

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
      const checkAuthorBooster: CheckRole = new CheckRole(
        client,
        message.member,
        levelBooster
      );

      if (!checkAuthorBooster.CheckReturnBoolean())
        return message.channel.send({ embeds: [missingPermission] });

      //*2 Configurando a viriavel para armazenar o nome do canal.
      const nameChannel: string = args.join(" ");

      if (nameChannel.trim() === "")
        return message.channel.send({ embeds: [missingName] }).then((m) => {
          setTimeout(() => m.delete(), 15000);
        });
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
            channelExistCheck=
            message.guild.channels.cache.get(userBooster.idChannel);
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
              setTimeout(() => m.delete(), 15000);
              await loading.delete();
            });

        if (!channelExistCheck) {
          await UserBoostModel.findOneAndUpdate(
            { userId: message.author.id },
            { $set: { numberChannel: 0, idChannel: "123" } }
          );
        }

        //* 5 Registrando a categoria que os canais de bufadores ficam

        await channelExistCheck.setName(nameChannel);
        await loading.delete();

        let channelRenameSucess:MessageEmbed = new MessageEmbed()
            .setTitle(
              "**:white_check_mark: Nome alterado com sucesso. :white_check_mark:**"
            )
            .setAuthor({
                name: `${client.user.username}`,
                iconURL: `${client.user.displayAvatarURL()}`,
              })
            .setColor("#21c918")
            .addField(
              "O nome do canal foi alterado com sucesso.",
              `O nome do seu canal a partir de agora será "${nameChannel}".`
            )
            .addField(
              "❌ O discord, por padrão, requer um intervalo de tempo de 10 minutos a cada 2 alterações para renomear canais via bot. Então caso precise alterar o nome do seu canal, contate um admin.",
              "\u200b"
            );

          message.channel
            .send({ embeds: [channelRenameSucess] })
            .then((msg) => setTimeout(() => {if(msg.deletable) msg.delete()}, 15000));

      });
    } catch (error) {
      console.log(error);
    }
  },
};
