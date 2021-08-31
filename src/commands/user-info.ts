import {
  Client, GuildMember, Message, MessageEmbed, User,
} from 'discord.js';
import dayjs from 'dayjs';
import container from '../lib/inversify.config';
import CommandInterface, { CommandData } from '../lib/types/commands';
import ContainerTypes from '../lib/types/dependencies';
import Command from '../lib/decorators/command';

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
  async execute(message: Message, commandData: CommandData) {
    const { author }: {author: User} = commandData;

    const UserProfileURL = await author.avatarURL({
      size: 512,
    });

    if (UserProfileURL === null) return;

    const GuildUser: GuildMember | undefined = await message.guild?.members.fetch(author.id);

    const CreatedAtString: string = dayjs(author.createdAt).format('DD.MM.YYYY HH:MM');
    const TimeSinceCreated: string = dayjs(author.createdAt).fromNow();
    const CreatedAtFieldData = `${CreatedAtString}\n( ${TimeSinceCreated} )`;

    const JoinedAtString: string = dayjs(GuildUser?.joinedAt).format('DD.MM.YYYY HH:MM');
    const TimeSinceJoined: string = dayjs(GuildUser?.joinedAt).fromNow();
    const JoinedAtFieldData = `${JoinedAtString}\n( ${TimeSinceJoined} )`;

    const UserRolesCollection = GuildUser?.roles.cache;

    const EmbedMessage = new MessageEmbed()
      .setTitle(`${author.username}#${author.discriminator}'s profile`)
      .setThumbnail(UserProfileURL)
      .addField('Created at', CreatedAtFieldData, true)
      .addField('Joined at', JoinedAtFieldData, true)
      .addField('Roles', UserRolesCollection?.filter((role) => role.name !== '@everyone').map((role) => role.name).join(', ') ?? 'none');

    message.channel.send({ embeds: [EmbedMessage] });
  }
}
