import Bot from '../lib/bot';
import container from '../lib/inversify.config';
import ContainerTypes from '../lib/types/dependencies';

export default async function LoadBot() {
  try {
    const bot = container.get<Bot>(ContainerTypes.Bot);

    await bot.listen();
    console.log('The bot is now on and listening to events.');
  } catch (e: any) {
    console.error(`Unexpected error: ${e}`);
  }
}
