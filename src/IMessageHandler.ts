import { Message } from 'discord.js';
export interface IMessageHandler {
  canHandle(message: Message): boolean;
  handle(message: Message);
}
