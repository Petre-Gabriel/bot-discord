import {
  GuildMemberRoleManager,
  Message, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed, Permissions,
} from 'discord.js';
import HasbullaGifModel from '../database/HasbullaGif/HasbullaGif.model';
import Command from '../lib/decorators/command';
import CommandInterface from '../lib/types/commands';

@Command
export default class Hasbulla implements CommandInterface {
  name: string;

  usage: string;

  constructor() {
    this.name = 'hasbulla';
    this.usage = '>hasbulla';
  }

  // eslint-disable-next-line class-methods-use-this, consistent-return
  async execute(message: Message): Promise<any> {
    const DocumentsCount = await HasbullaGifModel.count();

    if (DocumentsCount === 0) { return message.reply('```Nu a fost gasit niciun gif cu Hasbulla 😞```'); }

    const randomRow = Math.floor(Math.random() * DocumentsCount);

    const RandomGif = await HasbullaGifModel.findOne().skip(randomRow);

    if (!RandomGif) { return message.reply('```Nu a fost gasit niciun gif cu Hasbulla 😞```'); }

    const EmbedMessage = new MessageEmbed()
      .setImage(RandomGif.url)
      .setTitle(`#${RandomGif.id}`)
      .addField('Creator', RandomGif.creator, true)
      .addField('Created at', RandomGif.createdAt, true);

    const DeleteGIFButton = new MessageButton().setStyle('DANGER').setCustomId('delete-gif').setLabel('Sterge GIF');

    const ActionRow: MessageActionRow = new MessageActionRow()
      .addComponents(DeleteGIFButton);

    const SentMessage: Message = await message.channel.send({
      embeds: [EmbedMessage],
      components: [ActionRow],
    });

    const interactionFilter = (i: MessageComponentInteraction) => i.customId === 'delete-gif';
    const collector = SentMessage.createMessageComponentCollector({
      filter: interactionFilter,
      time: 30000,
    });

    collector.on('collect', async (interaction): Promise<any> => {
      if (interaction.customId !== 'delete-gif') { return; }

      const GuildMemberRoles = interaction.member?.roles as GuildMemberRoleManager;

      const CanDeleteGIF = GuildMemberRoles.highest.permissions
        .has(Permissions.FLAGS.ADMINISTRATOR);

      if (!CanDeleteGIF) { return; }

      await SentMessage.delete();
      await RandomGif.remove();
      await collector.stop();
    });
  }
}
