import ExtendedClient from "../../Client/index";
import { Event } from "../../interfaces/Event";
import { GuildBasedChannel, GuildMember, MessageEmbed, Role } from "discord.js";

export const event: Event = {
  name: "guildMemberUpdate",
  run: async (
    client: ExtendedClient,
    oldMember: GuildMember,
    newMember: GuildMember
  ) => {
    //*1 Pegando os cargos do usuario antes e depois de atualizar

    const hadRole: Role = oldMember.roles.cache.find(
      (role) => role.name == "Server Booster"
    );
    const hasRole: Role = newMember.roles.cache.find(
      (role) => role.name == "Server Booster"
    );

    let userBoost: MessageEmbed = new MessageEmbed()
      .setTitle(
        `:tada: :confetti_ball:  **Servidor impulsionado por ___${newMember.user.username}___**  :tada: :confetti_ball: `
      )
      .setDescription(
        `*:partying_face: Deem boas vindas ao nosso mais novo bufador <@${newMember.user.id}>! :partying_face:*`
      )
      .setColor("#800080");

    //*2 Checando se o usuario não tinha o cargo "Server Booster" e agora tem

    if (!hadRole && hasRole) {
      let channelBooster: GuildBasedChannel =
        newMember.guild.channels.cache.get("929440410496020510");

      if (channelBooster.type === "GUILD_TEXT") {
        channelBooster.send({ embeds: [userBoost] });
        newMember.roles.add("929777206631223346");
      }
    } else if (hadRole && !hasRole) {
      newMember.roles.remove("929777206631223346");
    }
  },
};
