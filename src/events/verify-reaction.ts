import {
  GuildMember, Message, PartialMessage,
} from 'discord.js';
import OnReaction from '../lib/decorators/event';
import container from '../lib/inversify.config';
import BotConfiguration from '../lib/types/config';
import ContainerTypes from '../lib/types/dependencies';
import { ReactionHookData, ReactionHook } from '../lib/types/hooks';

@OnReaction()
export default class VerifyReaction implements ReactionHook {
  messageId: string;

  channelId: string;

  guildId: string;

  private botConfig: BotConfiguration;

  private roleId: string;

  constructor() {
    this.messageId = '880087506324975656';
    this.channelId = '879946468386013234';
    this.guildId = '879941977314050058';
    this.roleId = '879945571975196703';

    this.botConfig = container.get<BotConfiguration>(ContainerTypes.BotConfig);

    console.log(`Added reaction hook to #${this.messageId}. Giving out role #${this.roleId}`);
  }

  // eslint-disable-next-line class-methods-use-this
  public async execute(reactionData: ReactionHookData): Promise<void> {
    const { author, guild } = reactionData;
    const { message } : {message: Message | PartialMessage} = reactionData.reaction;

    try {
      const GuildMemberData: GuildMember = await guild.members.fetch(author.id);
      await GuildMemberData.roles.add(this.roleId);
    } catch (e) {
      console.log('VerifyReaction: not allowed to add role to user.');
      const errorMessage: Message = await message.channel.send(`<@${author.id}> I'm sorry. I can't add you to the member list right now. Please try again later or contact Gabriel03#3616.`);

      setTimeout((): void => {
        errorMessage.delete();
      }, this.botConfig.errorTimeoutTime);
    }
  }
}
