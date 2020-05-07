import { Client } from 'discord.js';
import InviteSpammerHandler from './InviteSpammerHandler';
import { IMessageHandler } from './IMessageHandler';

const client = new Client();

client.on('ready', () => {
  console.log('I am ready!');
});

const messageHandlers: IMessageHandler[] = [
  new InviteSpammerHandler()
];

client.on('message', async (message) => {
  const handler = messageHandlers.find((h) => h.canHandle(message));
  if (handler) {
    await handler.handle(message);
  }
});

client.login(process.env.BOT_TOKEN);
