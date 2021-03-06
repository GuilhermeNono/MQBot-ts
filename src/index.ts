import Client from "./Client/index";
import { Intents } from "discord.js";
new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_BANS,
      // Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    partials: ["USER", "REACTION", "MESSAGE", "GUILD_MEMBER"],
  }).init()