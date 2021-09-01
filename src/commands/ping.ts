import { Client, Message } from 'discord.js';
import Command from '../lib/decorators/command';
import container from '../lib/inversify.config';
import CommandInterface from '../lib/types/commands';
import ContainerTypes from '../lib/types/dependencies';

@Command
export default class PingCommand implements CommandInterface {
  name: string;

  usage: string;

  client: Client;

  constructor() {
    this.name = 'ping';
    this.usage = '>ping';
    this.client = container.get<Client>(ContainerTypes.Client);
  }

  // eslint-disable-next-line class-methods-use-this
  public execute(message: Message) {
    const LatencyInMS = Date.now() - message.createdTimestamp;
    const APIPing = this.client.ws.ping;

    message.channel.send(`Latency -> ${LatencyInMS}ms.\nAPI latency: ${APIPing}ms`);
  }
}
