import { Message } from 'discord.js';
import { IMessageHandler } from './IMessageHandler';

export default class InviteSpammerHandler implements IMessageHandler {
  spammers: { [key: string]: number } = {};

  canHandle(message: Message) {
    return message.content.indexOf('//discord.gg/') !== -1 && !message.member.hasPermission('MANAGE_CHANNELS');
  }

  async handle(message: Message) {
    if (this.spammers[message.member.id]) {
      this.spammers[message.member.id]++;
    } else {
      this.spammers[message.member.id] = 0;
    }

    if (this.spammers[message.member.id] > 0) {
      await message.member.kick('NEVER spam your discord channel.');
      console.log(`Kicked user ${message.member.user.username}, id: ${message.member.id}`)
    }

    await message.delete();
    await message.channel.send(`@${message.member.user.username}: Please don't spam other discord channels.`)
    console.log(`Deleted spam message from ${message}: ${message.member.user.username}`);
  }
}
