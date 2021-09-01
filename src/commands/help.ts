import { ColorResolvable, Message, MessageEmbed } from 'discord.js';
import Command from '../lib/decorators/command';
import container from '../lib/inversify.config';
import CommandInterface from '../lib/types/commands';
import BotConfiguration from '../lib/types/config';
import ContainerTypes from '../lib/types/dependencies';

@Command
export default class Help implements CommandInterface {
  name: string;

  usage: string;

  botConfiguration: BotConfiguration;

  constructor() {
    this.name = 'help';
    this.usage = '>help';

    this.botConfiguration = container.get<BotConfiguration>(ContainerTypes.BotConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  execute(message: Message) {
    const GuildURL = message.guild?.iconURL({
      size: 512,
    }) || '';

    const EmbedMessage: MessageEmbed = new MessageEmbed()
      .setTitle('Help - commands')
      .setThumbnail(GuildURL)
      .setColor(this.botConfiguration.mainColorHEX as ColorResolvable)
      .addField('Fun commands', 'hasbulla', true)
      .addField('Admin commands', 'add, mute', true)
      .addField('Debug', 'ping');

    message.channel.send({ embeds: [EmbedMessage] });
  }
}
