import { GuildMember, Message, User } from 'discord.js';
import { injectable } from 'inversify';
import UserModel from '../../database/User/User.model';

@injectable()
export default class MuteHandler {
  private muteCache: Map<string, number>;

  constructor() {
    this.muteCache = new Map();
  }

  // eslint-disable-next-line class-methods-use-this
  async verifyMuteStatus(message: Message): Promise<boolean> {
    const MuteCache = this.muteCache.get(message.author.id);

    let muteTime: number | null = null;
    if (typeof MuteCache === 'number') {
      muteTime = MuteCache;
    } else {
      const UserFound = await UserModel.findOne({ discordID: message.author.id });
      if (UserFound !== null) {
        muteTime = UserFound.muteTime;
      }
    }
    this.updateCacheForUser(message.author, muteTime || 0);

    const hasMute = muteTime !== null && muteTime > Date.now();

    if (hasMute) { await message.delete(); }

    return hasMute;
  }

  updateCacheForUser(user: User | GuildMember, time: number) {
    this.muteCache.set(user.id, time);
  }
}
