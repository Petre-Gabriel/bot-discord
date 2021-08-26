import {
  Client, Guild, MessageReaction, PartialMessageReaction, PartialUser, TextChannel, User,
} from 'discord.js';
import { inject, injectable } from 'inversify';
import ContainerTypes from '../types/dependencies';
import { ReactionHook, ReactionHookData, ReactionHookEventData } from '../types/hooks';

@injectable()
export default class ReactionHandler {
  private client: Client;

  private reactionHook: ReactionHookEventData[];

  constructor(
  @inject(ContainerTypes.Client) client: Client,
  ) {
    this.client = client;
    this.reactionHook = [];

    this.client.on('messageReactionAdd', (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
      this.reactionHook.forEach((HookData: ReactionHookEventData) => {
        const { hook } = HookData;
        if (reaction.message.id !== hook.messageId) { return; }

        const ReactionHookDTO: ReactionHookData = {
          reaction,
          author: user,
          guild: HookData.guild,
        };

        hook.execute(ReactionHookDTO);
      });
    });

    console.log('ReactionHandler module has been initiated.');
  }

  public async registerReactionHook(hook: ReactionHook) {
    const guild: Guild = await this.client.guilds.fetch(hook.guildId);
    const channel = await guild.channels.fetch(hook.channelId);

    if (channel?.isText()) {
      const textChannel = channel as TextChannel;

      await textChannel.messages.fetch(hook.messageId);

      const HookEventData: ReactionHookEventData = {
        hook,
        channel: textChannel,
        guild,
      };
      this.reactionHook.push(HookEventData);
    }
  }
}
