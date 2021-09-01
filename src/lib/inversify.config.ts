import 'reflect-metadata';
import { Container } from 'inversify';
import { Client } from 'discord.js';
import ContainerTypes from './types/dependencies';

import Bot from './bot';
import DiscordClientOptions from './config/discord-client';
import { env } from './helpers/fallback';

import BotConfig from './config/bot';
import BotConfiguration from './types/config';
import CommandHandler from './services/command-handler';
import MessageResponder from './services/message-responder';
import ReactionHandler from './services/reaction-handler';
import MuteHandler from './services/mute-handler';

const container = new Container({
  defaultScope: 'Singleton',
});

const LOGIN_TOKEN = env('TOKEN', null);

container.bind<Bot>(ContainerTypes.Bot).to(Bot);
container.bind<MessageResponder>(ContainerTypes.MessageResponder).to(MessageResponder);
container.bind<ReactionHandler>(ContainerTypes.ReactionHandler).to(ReactionHandler);
container.bind<MuteHandler>(ContainerTypes.MuteHandler).to(MuteHandler);

// Constants
container.bind<Client>(ContainerTypes.Client).toConstantValue(new Client(DiscordClientOptions));
container.bind<CommandHandler>(ContainerTypes.CommandHandler).toConstantValue(new CommandHandler());
container.bind<string>(ContainerTypes.Token).toConstantValue(LOGIN_TOKEN);
container.bind<BotConfiguration>(ContainerTypes.BotConfig).toConstantValue(BotConfig);

export default container;
