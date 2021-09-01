import { Message, Permissions } from 'discord.js';
import Command from '../lib/decorators/command';
import container from '../lib/inversify.config';
import CommandInterface, { CommandData } from '../lib/types/commands';
import BotConfiguration from '../lib/types/config';
import ContainerTypes from '../lib/types/dependencies';

@Command
export default class Config implements CommandInterface {
  name: string;

  usage: string;

  botConfiguration: BotConfiguration;

  constructor() {
    this.name = 'config';
    this.usage = '>config <config> <value>';

    this.botConfiguration = container.get<BotConfiguration>(ContainerTypes.BotConfig);
  }

  // eslint-disable-next-line class-methods-use-this, consistent-return
  async execute(message: Message, commandData: CommandData) {
    const hasAccess = message.member?.roles.highest.permissions
      .has(Permissions.FLAGS.ADMINISTRATOR);

    if (!hasAccess) { return message.channel.send('```You are not allowed to do this.```'); }

    const [configName, value] = commandData.args;

    const availableConfig = ['prefix', 'errorTimeoutTime', 'mainColorHEX'];

    const configNameLowerCase = configName.toLowerCase();

    const isValid = availableConfig.some(
      (conf) => conf.toLowerCase() === configNameLowerCase,
    );

    if (!isValid) { return message.channel.send(`\`\`\`Property '${configName}' is invalid.\`\`\``); }

    switch (configNameLowerCase) {
      case 'prefix':
        this.botConfiguration.prefix = value;
        break;
      case 'errortimeouttime':
        this.handleErrorTimeout(message, value);
        break;
      case 'maincolorhex':
        this.handleMainColor(message, value);
        break;
      default:
        break;
    }
    message.channel.send(`\`\`\`Config property ${configName} has been updated to ${value}\`\`\``);
  }

  // eslint-disable-next-line consistent-return
  async handleErrorTimeout(message: Message, value: string) {
    const valueParsedAsInt = parseInt(value, 10);

    if (Number.isNaN(valueParsedAsInt)) { return message.channel.send('```You must provide a valid number.```'); }

    this.botConfiguration.errorTimeoutTime = valueParsedAsInt;
  }

  // eslint-disable-next-line consistent-return
  async handleMainColor(message: Message, value: string) {
    const hexColorRegex = /^#([a-zA-Z0-9]){6,6}$/g;

    if (!hexColorRegex.test(value)) { return message.channel.send('```You must provide a valid hex color.```'); }

    this.botConfiguration.mainColorHEX = value;
  }
}
