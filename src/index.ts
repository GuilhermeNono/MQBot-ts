import Client from './Client';
import {Intents} from 'discord.js'
new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
    partials: ['USER', 'REACTION', 'MESSAGE']
}).init();