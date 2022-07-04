import { GuildMember, MessageAttachment, MessageEmbed } from "discord.js";
import { EmbedTemplates, Rarity} from "../../../lib/modules";
import { UserDataModel, insigniaDataModel } from "../../../models/";
import { Command, InsigniaInfo } from "../../interfaces";
import { createCanvas, Image, loadImage, registerFont } from "canvas";
import path from "path";
import CanvasUI from "../../../lib/modules/Canvas";
registerFont(
  path.join(__dirname, "..", "..", "Assets", "fonts/Poppins-Regular.ttf"),
  {
    family: "Poppins",
  }
);

export const command: Command = {
  name: "carteira",
  aliases: ["wallet", "bolsa", "bag", "inventario", "inv"],
  isOff: true,
  run: async (client, message, args) => {
    //.carteira <@user>

    //*1 - Coletando informações do usuário

    const Embeds: EmbedTemplates = new EmbedTemplates(client);

    let person: GuildMember;

    //Checando se o argumento foi uma marcação.
    let personCheck: Boolean = message.mentions.users.first() === undefined;

    //Checando se o argumento é um parametro vazio.
    if (args[0] === undefined || "") person = message.member;

    //Checando se o argumento começa com letras.
    if (/^[a-zA-Z]+$/.test(args[0])) {
      person = message.member;
    }

    //Checando se o argumento informado é igual a um numero.
    if (!isNaN(parseInt(args[0]))) {
      //Checando se contem alguma letra em meio aos numeros.
      try {
        person = message.guild.members.cache.find(
          (memberID) => memberID.id === args[0]
        );
      } catch {
        person = message.member;
      }
    } else {
      person = personCheck
        ? message.guild.members.cache.get(args[0])
        : message.guild.members.cache.get(message.mentions.users.first().id);
    }

    if (!person) person = message.member;

    //*2 - Coletando informações sobre as insignias do usuario

    let userData = await UserDataModel.findOne({
      userId: person.id,
      serverId: message.guild.id,
    });
    let userInsignias = userData.insigniaID;

    let insigniasData: InsigniaInfo[] = [];

    for (let i = 0; i < userInsignias.length; i++) {
      let insigniaInfo = await insigniaDataModel
        .findOne({ insigniaID: userInsignias[i] })
        .exec();
      insigniasData.push({
        insigniaID: insigniaInfo.insigniaID ? insigniaInfo.insigniaID : -1,
        insigniaName: insigniaInfo.insigniaName
          ? insigniaInfo.insigniaName
          : "undefined",
        insigniaDescription: insigniaInfo.description
          ? insigniaInfo.description
          : "undefined",
        insigniaURL: insigniaInfo.insigniaURL
          ? insigniaInfo.insigniaURL
          : "undefined",
        insigniaBoost: Number(insigniaInfo.xpBoost ? insigniaInfo.xpBoost : 0),
        insigniaRarity: insigniaInfo.rarity ? insigniaInfo.rarity : 0,
      });
    }

    //*3 - Montando embed

    let embedBag = new MessageEmbed()
      .setTitle(`💠 Carteira de insignias ➟ ${person.displayName} 💠`)
      .setDescription(
        `Olá, ${person.displayName}. Meu nome é Peach, e eu estarei cuidando da sua carteira de insignias enquanto você estiver no servidor. Aqui estão todas as insignias que possui até o momento: `
      )
      .setColor("RANDOM")
      .addField(
        "🔹 | Insignias | 🔹",
        "\u200b",
        true
      );
      
      insigniasData.sort((a, b) => Number(a.insigniaRarity)-Number(b.insigniaRarity));
      insigniasData.reverse();

    for (let i = 0; i < insigniasData.length; i++) {
      
      const emojiRarity = new Rarity(client, Number(insigniasData[i].insigniaRarity)).getEmojiRarity();

      embedBag.addField(
        "`" + emojiRarity + " ➟ " + insigniasData[i].insigniaName + " 🠔 " + emojiRarity +"`",
        "`" + insigniasData[i].insigniaDescription + "`"
      );
    }

    // message.channel.send({ embeds: [embedBag] });
    
    const avatarProfile = await loadImage(person.user.avatarURL({ format: "jpeg" }))

    const canvas = new CanvasUI(450, 800);
    const walletCanvas = await canvas.CanvasWallet(
      { userAvatarImage: avatarProfile, userId: person.user.id }
    );
    
    message.channel.send({files:[walletCanvas]})
  },
};
