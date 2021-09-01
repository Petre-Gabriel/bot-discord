import { Message } from 'discord.js';
import CommandInterface, { CommandData } from '../lib/types/commands';
import Command from '../lib/decorators/command';
import UserModel from '../database/User/User.model';
import MuteHandler from '../lib/services/mute-handler';
import container from '../lib/inversify.config';
import ContainerTypes from '../lib/types/dependencies';

@Command
export default class Mute implements CommandInterface {
  name: string;

  usage: string;

  muteHandler: MuteHandler

  constructor() {
    this.name = 'mute';
    this.usage = '>mute <user> <time>';

    this.muteHandler = container.get<MuteHandler>(ContainerTypes.MuteHandler);
  }

  // eslint-disable-next-line class-methods-use-this, consistent-return
  async execute(message: Message, commandData: CommandData) {
    const [mention] = commandData.args;
    const timeInMin = parseInt(commandData.args[1], 10);
    const userToMute = message.mentions.users.first();

    const validateMentionRegex = /^<@[!&]([0-9]+)>$/g;

    if (!validateMentionRegex.test(mention)) { return message.channel.send('```Trebuie sa mentionezi un utilizator caruia sa ii dai mute.```'); }

    if (userToMute?.id === message.author.id) { return message.channel.send('```Nu poti sa iti dai singur mute.```'); }

    if (Number.isNaN(timeInMin)) { return message.channel.send('```Please enter a valid time in minutes.```'); }

    if (timeInMin <= 0) { return message.channel.send('```Timpul trebuie sa fie minim 1 minut.```'); }

    if (!userToMute) { return message.reply('```Nu a fost mentionat niciun user pentru a primi mute.```'); }

    const TimeAfterMute = Date.now() + (timeInMin * 60000);

    this.muteHandler.updateCacheForUser(userToMute, TimeAfterMute);

    const UserFound = await UserModel.findOne({
      discordID: userToMute.id,
    });

    if (UserFound === null) {
      const newUser = new UserModel({
        discordID: userToMute.id,
        muteTime: TimeAfterMute,
      });

      await newUser.save();
    } else {
      UserFound.muteTime = TimeAfterMute;
      UserFound.save();
    }

    message.reply(`\`\`\`Utilizatorul a fost adus la tacere pentru ${timeInMin} minute. \`\`\``);
  }
}
