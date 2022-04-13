import { Message, MessageEmbed } from "discord.js";
import { SetRarity } from "../../../lib/modules/index";
import { UserDataModel, insigniaDataModel } from "../../../models/index";
import ExtendedClient from "../../Client";

async function BypassINS(
  client: ExtendedClient,
  message: Message<boolean>
): Promise<Message<boolean>> {
  try {
    let memberDB = await UserDataModel.findOne({
      userId: message.member.id,
      serverId: message.guild.id,
    }).exec();
    if (memberDB === null) return;

    if(!memberDB.insigniaID.includes(4)) {
    let newInsigniaID = memberDB.insigniaID;
    newInsigniaID.push(4);

    await UserDataModel.updateOne({userId: message.member.id, serverId: message.guild.id}, {insigniaID: newInsigniaID}).exec();

    let insigniaInfo = await insigniaDataModel
      .findOne({ insigniaID: 4 })
      .exec();

    let embedNewInsignia = new MessageEmbed()
      .setTitle(`✨ Insignia conquistada ➟ __Bypass__ ✨`)
      .setColor(SetRarity(insigniaInfo.rarity))
      .setAuthor({ name: "BYPASS", iconURL: insigniaInfo.insigniaURL })
      .setFooter({
        text: `${message.author.username}`,
        iconURL: (message.author.displayAvatarURL() ? message.author.displayAvatarURL() : undefined),
      });

    return await message.channel.send({ embeds: [embedNewInsignia] });
    }
  } catch (error) {
    console.log(error);
  }
}

export default BypassINS;
