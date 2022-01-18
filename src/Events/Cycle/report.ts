import ExtendedClient from "../../Client/index";
import { Client, GuildBasedChannel, Message, MessageEmbed } from "discord.js";

async function Report(message: Message, client: Client<true>): Promise<any> {
  try {
    if (message.guild.id !== "929417995325956177") return;

    //*1 Pegando as informações do canal.
    let channelReports: GuildBasedChannel =
      message.guild.channels.cache.get("929428196313669692");
    if (channelReports.type === "GUILD_TEXT") {
      //*2 Verificando se a mensagem não é do bot e se foi enviada no canal correto.
      if (message.channel.id !== channelReports.id) return;
      if (message.deletable) message.delete();

      //*3 Verificando se a mensagem não passou dos 4096 caracteres(Limite de caracteres informado pela api)
      let limitDescriprion: MessageEmbed = new MessageEmbed()
        .setColor("#fcb83a")
        .setTitle("Limite excedido.")
        .setDescription(
          "Aparentemente, o limite de caracteres por report foi excedido. Por favor, limite seu report a no maximo **4096 Caracteres**."
        );

      if (message.content.length >= 4096) {
        return message.channel
          .send({ embeds: [limitDescriprion] })
          .then((msg) => setTimeout(() => msg.delete, 15000));
      }

      //*4 Criando os embeds e alocando variaveis com id e username de quem enviou o report

      let embedReport: MessageEmbed = new MessageEmbed()
        .setTitle(":recycle: | SEU TICKET FOI ENVIADO COM SUCESSO | :recycle:")
        .setDescription(
          " Podemos em breve entrar em contato para mais detalhes ou resolver por tras dos panos. Independente da modo, você será notificado quando for resolvido."
        )
        .setFooter({ text: "Nos vemos logo ;>!" })
        .setColor("#00ff1a");

      //*5 Setando as variaveis para pegar imagens enviadas pelo usuario

      let evidenceImage: any = message.attachments.first();
      if (!evidenceImage) {
        evidenceImage =
          "http://www.junata.com.br/wp-content/uploads/2013/05/placeholder3.png";
      } else {
        evidenceImage = evidenceImage.attachment;
      }

      let embedReportModeration: MessageEmbed = new MessageEmbed()
        .setColor("#fc6060")
        .setTitle(
          `:question: | Report de ${message.author.tag} ➔ ` +
            message.guild.name +
            " |:question: "
        )
        .setDescription(" ➔ " + message.content)
        .setImage(evidenceImage)
        .setFooter({ text: `ID ${message.author.id}` });

      //*6 Tentando enviar uma mensagem para a DM do usuario, caso não consiga ele enviará no mesmo chat que foi feito o report
      message.author
        .send({ embeds: [embedReport] })
        .then((msg) => {
          SendEmbed(msg);
        })
        .catch(() => {
          message.channel.send({ embeds: [embedReport] }).then((msg_1) => {
            SendEmbed(msg_1);
          });
        });

      //Criando uma função para enviar 1 Embed para cada servidor e apagar a mensagem do canal.
      function SendEmbed(msg: Message<boolean>) {
        const peachServer: GuildBasedChannel = client.guilds.cache
          .get("929417995325956177")
          .channels.cache.get("929786857464668222");

        if (peachServer.type === "GUILD_TEXT")
          peachServer.send({ embeds: [embedReportModeration] });

        const briocoServer: GuildBasedChannel = client.guilds.cache
          .get("466405222877495299")
          .channels.cache.get("776076196793679892");

        if (briocoServer.type === "GUILD_TEXT")
          briocoServer.send({ embeds: [embedReportModeration] });

        return setTimeout(() => msg.delete(), 30000);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default Report;
