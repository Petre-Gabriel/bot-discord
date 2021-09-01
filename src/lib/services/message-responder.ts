import { Client, Message } from 'discord.js';
import { inject, injectable } from 'inversify';
import BotConfiguration from '../types/config';
import ContainerTypes from '../types/dependencies';
import MessageMetaData from '../types/message';
import CommandHandler from './command-handler';
import MuteHandler from './mute-handler';

@injectable()
export default class MessageResponder {
  private botConfig: BotConfiguration;

  private commandHandler: CommandHandler;

  private muteHandler: MuteHandler;

  private client: Client;

  constructor(
  @inject(ContainerTypes.BotConfig) botConfig: BotConfiguration,
    @inject(ContainerTypes.CommandHandler) commandHandler: CommandHandler,
    @inject(ContainerTypes.Client) client: Client,
    @inject(ContainerTypes.MuteHandler) muteHandler: MuteHandler,
  ) {
    this.botConfig = botConfig;
    this.commandHandler = commandHandler;
    this.client = client;
    this.muteHandler = muteHandler;

    // Create handler
    this.client.on('messageCreate', (message: Message) => {
      this.handle(message);
    });

    console.log('MessageResponder module has been initiated.');
  }

  private getMessageMetaData(message: Message): MessageMetaData {
    const stripedMessage = message.content.split(' ');

    const commandName = stripedMessage[0].replace(this.botConfig.prefix, '');
    const isCommand: boolean = this.commandHandler.doesCommandExist(commandName);

    return {
      defaultMessage: message,
      stripedMessage,
      commandName,
      isCommand,
    };
  }

  public async handle(message: Message): Promise<void> {
    if (message.author.bot) { return; }

    if (await this.muteHandler.verifyMuteStatus(message)) { return; }

    if (!message.content.startsWith(this.botConfig.prefix)) { return; }

    const messageData: MessageMetaData = this.getMessageMetaData(message);
    if (!messageData.isCommand) { return; }

    this.commandHandler.executeCommand(messageData.commandName, message);
  }
}
