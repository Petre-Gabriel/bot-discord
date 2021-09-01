import { Message, User } from 'discord.js';
import HasbullaGifModel from '../database/HasbullaGif/HasbullaGif.model';
import Command from '../lib/decorators/command';
import FormatDateToString from '../lib/helpers/date';
import isValidUrl from '../lib/helpers/validation';
import CommandInterface, { CommandData } from '../lib/types/commands';

@Command
export default class Add implements CommandInterface {
  name: string;

  usage: string;

  constructor() {
    this.name = 'add';
    this.usage = 'add <type> <value>';
  }

  // eslint-disable-next-line class-methods-use-this
  async execute(message: Message, commandData: CommandData) {
    const [addType, addValue] = commandData.args;
    switch (addType.toLowerCase()) {
      case 'hasbulla':
        this.addHasbullaGif(addValue, commandData.author, message);
        break;
      default:
        message.reply(`\`\`\`${addType} is in invalid type.\`\`\``);
        break;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async addHasbullaGif(url: string, author: User, message: Message): Promise<any> {
    try {
      if (!isValidUrl(url)) { return message.reply('```URL-ul este invalid. Foloseste formatul: http(s)://example.com/etc```'); }

      const CreatedAt = FormatDateToString(Date.now());

      const HasbullaGifEntry = new HasbullaGifModel({
        url,
        createdAt: CreatedAt,
        creator: author.username,
      });

      await HasbullaGifEntry.save();

      return message.reply('```GIF-ul a fost adaugat in lista noastra!```');
    } catch (e) {
      console.log(`Unexpected error while adding Hasbulal Gif: ${e}`);

      return message.reply('```A aparut o eroare la salvarea GIF-ului in baza de date. Incearca mai tarziu!```');
    }
  }
}
