import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';
import MessageResponder from './services/message-responder';
import ContainerTypes from './types/dependencies';

@injectable()
export default class Bot {
  private client: Client;

  private messageResponder: MessageResponder

  private token: string;

  constructor(
  @inject(ContainerTypes.Client) client: Client,
    @inject(ContainerTypes.Token) token: string,
    @inject(ContainerTypes.MessageResponder) messageResponder: MessageResponder,
  ) {
    this.client = client;
    this.token = token;
    this.messageResponder = messageResponder;
  }

  public listen(): Promise<string> {
    return this.client.login(this.token);
  }
}
