import { Message } from 'discord.js';
import { IMessageHandler } from './IMessageHandler';

export default class InviteSpammerHandler implements IMessageHandler {
  spammers: { [key: string]: number } = {};

  canHandle(message: Message) {
    return message.content.indexOf('//discord.gg/') !== -1 && !message.member?.hasPermission('MANAGE_CHANNELS');
  }

  async handle(message: Message) {
    const user = message.member;
    const username = message.member?.user?.username || 'someone';

    if (user) {
      if (this.spammers[user.id]) {
        this.spammers[user.id]++;
      } else {
        this.spammers[user.id] = 0;
      }

      if (this.spammers[user.id] > 0) {
        await user.kick('NEVER spam your discord channel.');
        console.log(`Kicked user ${username}, id: ${user.id}`)
      }
    }

    await message.delete();
    await message.channel.send(`@${username}: Please don't spam other discord channels.`)
    console.log(`Deleted spam message from ${message}: ${username}`);
  }
}
