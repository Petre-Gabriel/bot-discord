import { Message } from 'discord.js';

interface MessageMetaData {
    defaultMessage: Message;
    stripedMessage: string[];
    commandName: string;
    isCommand: boolean;
}

export default MessageMetaData;
