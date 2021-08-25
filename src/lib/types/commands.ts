import { User } from 'discord.js';

interface Command {
  name: string;
  description?: string;
  usage: string;
  execute: Function;
}

export interface CommandData {
  args: string[];
  content: string;
  author: User;
}

export default Command;
