import {
  Guild,
  MessageReaction, PartialMessageReaction, PartialUser, TextChannel, User,
} from 'discord.js';

export interface ReactionHook {
  messageId: string;
  channelId: string;
  guildId: string;
  execute: Function;
}

export interface ReactionHookEventData {
  hook: ReactionHook;
  channel: TextChannel;
  guild: Guild;
}

export interface ReactionHookData {
  reaction: MessageReaction | PartialMessageReaction;
  author: User | PartialUser;
  guild: Guild;
}

export default ReactionHook;
