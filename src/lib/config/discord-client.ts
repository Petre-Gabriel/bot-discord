import { ClientOptions, Intents } from 'discord.js';

const DiscordClientOptions: ClientOptions = {
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
  // partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
};

export default DiscordClientOptions;
