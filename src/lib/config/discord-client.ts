import { ClientOptions, Intents } from 'discord.js';

const DiscordClientOptions: ClientOptions = {
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
};

export default DiscordClientOptions;
