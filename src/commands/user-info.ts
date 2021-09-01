import {
  Client, GuildMember, Message, MessageEmbed, User,
} from 'discord.js';
import dayjs from 'dayjs';
import container from '../lib/inversify.config';
import CommandInterface, { CommandData } from '../lib/types/commands';
import ContainerTypes from '../lib/types/dependencies';
import Command from '../lib/decorators/command';
import FormatDateToString from '../lib/helpers/date';

@Command
export default class UserInfo implements CommandInterface {
  name: string;

  usage: string;

  client: Client;

  constructor() {
    this.name = 'userinfo';
    this.usage = '>userinfo <username>';
    this.client = container.get<Client>(ContainerTypes.Client);
  }

  /* eslint-disable-next-line */
  async execute(message: Message, commandData: CommandData): Promise<any> {
    const { author }: {author: User} = commandData;

    const UserAsGuildMember: GuildMember | undefined = message.mentions.members?.first()
     || await message.guild?.members.fetch(author.id);

    const UserAsDiscordUser: User | undefined = UserAsGuildMember?.user;

    if (!UserAsGuildMember || !UserAsDiscordUser) {
      return message.reply('```Acest utilizator nu a fost gasit.```');
    }

    const UserProfileURL = await UserAsDiscordUser.avatarURL({
      size: 512,
    }) || await message?.guild?.iconURL({
      size: 512,
    }) || 'https://i.imgur.com/5cCF5tC.png';

    if (UserProfileURL === null) return null;

    const CreatedAtString: string = FormatDateToString(UserAsDiscordUser.createdAt);
    const TimeSinceCreated: string = dayjs(UserAsDiscordUser.createdAt).fromNow();
    const CreatedAtFieldData = `${CreatedAtString}\n(${TimeSinceCreated})`;

    const JoinedAtString: string = FormatDateToString(UserAsGuildMember?.joinedAt);
    const TimeSinceJoined: string = dayjs(UserAsGuildMember?.joinedAt).fromNow();
    const JoinedAtFieldData = `${JoinedAtString}\n(${TimeSinceJoined})`;

    const UserRolesCollection = UserAsGuildMember?.roles.cache;

    const EmbedMessage = new MessageEmbed()
      .setTitle(`${UserAsDiscordUser.username}#${UserAsDiscordUser.discriminator}'s profile`)
      .setThumbnail(UserProfileURL)
      .setColor(UserAsGuildMember.displayHexColor)
      .addField('Created at', CreatedAtFieldData, true)
      .addField('Joined at', JoinedAtFieldData, true)
      .addField('Roles', UserRolesCollection?.filter((role) => role.name !== '@everyone').map((role) => role.name).join(', ') ?? 'none');

    message.channel.send({ embeds: [EmbedMessage] });
  }
}
