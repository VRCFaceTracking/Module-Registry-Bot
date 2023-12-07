import SlashCommandOption from './slashCommandOption';

export enum SlashCommandType {
  ChatInput = 1,
  User = 2,
  Message = 3,
}

export default class SlashCommand {
  public name: string;
  public type: SlashCommandType;
  public description: string;
  public options: SlashCommandOption[];
}
