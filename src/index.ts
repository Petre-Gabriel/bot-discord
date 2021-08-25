import './lib/config/env';
import Bot from './lib/bot';
import container from './lib/inversify.config';
import ContainerTypes from './lib/types/dependencies';

import './loaders/commands';

const bot = container.get<Bot>(ContainerTypes.Bot);

async function start() {
  try {
    await bot.listen();
    console.log('The bot is now on and listening to events.');
  } catch (e: any) {
    console.error(`Unexpected error: ${e}`);
  }
}

start();
