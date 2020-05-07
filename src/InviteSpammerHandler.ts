import { Message } from 'discord.js';
import { IMessageHandler } from './IMessageHandler';

export default class InviteSpammerHandler implements IMessageHandler {
  canHandle(message: Message) {
    return message.content.indexOf('//discord.gg/') !== -1 && !message.member.hasPermission('MANAGE_CHANNELS');
  }

  async handle(message: Message) {
    // await message.member.kick('Don\'t spam your discord channel without permission.');

    await message.delete();
    await message.channel.send(`${message.member.nickname || message.member.user.username}: Please don't spam other discord channels.`)
  }
}
