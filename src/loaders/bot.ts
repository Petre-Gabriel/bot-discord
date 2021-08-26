import Bot from '../lib/bot';
import container from '../lib/inversify.config';
import ContainerTypes from '../lib/types/dependencies';

const bot = container.get<Bot>(ContainerTypes.Bot);

export default async function LoadBot() {
  try {
    await bot.listen();
    console.log('The bot is now on and listening to events.');
  } catch (e: any) {
    console.error(`Unexpected error: ${e}`);
  }
}
