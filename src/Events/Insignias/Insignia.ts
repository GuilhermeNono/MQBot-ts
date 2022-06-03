import { GuildTextBasedChannel, Message } from "discord.js";
import { EmbedTemplates, Rarity } from "../../../lib/modules";
import { insigniaDataModel, UserDataModel } from "../../../models";
import ExtendedClient from "../../Client";


interface IFields {
  channel: GuildTextBasedChannel;
  username: string;
  avatarURL: string;
  userId: string;
  guildId: string;
}

export default class Insignia {
  /**
   * 💠 - Realiza a checagem de requisitos para, só então, destribuir a insignia Bypass.
   * @param client ExtendedClient
   * @param fields IFields
   * @returns MessageEmbed | undefined
   */
  async Bypass(
    client: ExtendedClient,
    fields: IFields
  ): Promise<Message<boolean>> {
    const isSuccess = await giveInsignia(4, fields.userId, fields.guildId);
    if (isSuccess) {
      return sendEmbed(
        client,
        fields.channel,
        fields.username,
        fields.avatarURL,
        4,
        "Bypass"
      );
    }
  }

  /**
   * 💠 - Realiza a checagem de requisitos para, só então, destribuir a insignia Supporter.
   * @param client ExtendedClient
   * @param fields IFields
   * @returns MessageEmbed | undefined
   */
  async Supporter(
    client: ExtendedClient,
    fields: IFields
  ): Promise<Message<boolean>> {
    const isSuccess = await giveInsignia(5, fields.userId, fields.guildId);
    if (isSuccess) {
      return sendEmbed(
        client,
        fields.channel,
        fields.username,
        fields.avatarURL,
        5,
        "Supporter"
      );
    }
  }
}

async function giveInsignia(
  insignia: number,
  userId: string,
  guildId: string
): Promise<boolean> {
  let memberDB = await UserDataModel.findOne({
    userId: userId,
    serverId: guildId,
  }).exec();
  if (memberDB === null) return;

  if (!memberDB.insigniaID.includes(insignia)) {
    let newInsigniaID = memberDB.insigniaID;
    newInsigniaID.push(insignia);

    await UserDataModel.updateOne(
      { userId: userId, serverId: guildId },
      { insigniaID: newInsigniaID }
    ).exec();
    return true;
  } else {
    return false;
  }
}

async function sendEmbed(
  client: ExtendedClient,
  channel: GuildTextBasedChannel,
  username: string,
  avatarURL: string,
  idInsignia: number,
  InsigniaName: string
) {
  let insigniaInfo = await insigniaDataModel
    .findOne({ insigniaID: idInsignia })
    .exec();

  var colorRarity = new Rarity(client, insigniaInfo.rarity).getColorRarity();

  let embedNewInsignia = new EmbedTemplates(client).insigniaTemplate(
    username,
    avatarURL,
    InsigniaName,
    colorRarity,
    insigniaInfo
  );
  return await channel.send({ embeds: [embedNewInsignia] });
}
