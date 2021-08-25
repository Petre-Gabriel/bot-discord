import { Message, User } from 'discord.js';
import { injectable } from 'inversify';
import Command, { CommandData } from '../types/commands';

@injectable()
export default class CommandHandler {
  private commandsMap: Map<string, Command>;

  constructor() {
    this.commandsMap = new Map();
  }

  public registerCommand(commandData: Command): boolean {
    try {
      const { name } = commandData;
      this.commandsMap.set(name, commandData);

      return true;
    } catch (e) {
      console.error(`Error while adding command: ${e}`);
      return false;
    }
  }

  public doesCommandExist(commandName: string): boolean {
    return this.commandsMap.has(commandName);
  }

  public async executeCommand(commandName: string, message: Message): Promise<boolean> {
    if (!this.doesCommandExist(commandName)) { return false; }

    const commandData: Command | undefined = this.commandsMap.get(commandName);
    const splitMessage = message.content.split(' ');
    const args: string[] = splitMessage.slice(1);
    const messageWithoutCommand: string = splitMessage.slice(1).join('');
    const { author } : {author: User} = message;

    const CommandDetails: CommandData = {
      args,
      content: messageWithoutCommand,
      author,
    };

    commandData?.execute(message, CommandDetails);

    return true;
  }
}
