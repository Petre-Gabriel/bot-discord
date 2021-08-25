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

const container = new Container();

const LOGIN_TOKEN = env('TOKEN', '');

container.bind<Bot>(ContainerTypes.Bot).to(Bot).inSingletonScope();
container.bind<MessageResponder>(ContainerTypes.MessageResponder)
  .to(MessageResponder).inSingletonScope();

// Constants
container.bind<Client>(ContainerTypes.Client).toConstantValue(new Client(DiscordClientOptions));
container.bind<CommandHandler>(ContainerTypes.CommandHandler).toConstantValue(new CommandHandler());
container.bind<string>(ContainerTypes.Token).toConstantValue(LOGIN_TOKEN);
container.bind<BotConfiguration>(ContainerTypes.BotConfig).toConstantValue(BotConfig);

export default container;
