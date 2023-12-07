export class SlashCommandChoice {
  public name: string;
  public value: string | number;
}

export enum SlashCommandOptionType {
  SubCommand = 1,
  SubCommandGroup = 2,
  String = 3,
  Integer = 4,
  Boolean = 5,
  User = 6,
  Channel = 7,
  Role = 8,
  Mentionable = 9,
  Number = 10,
  Attachment = 11,
}

export default class SlashCommandOption {
  public name: string;
  public description: string;
  public type: SlashCommandOptionType;
  public required: boolean;
  public choices: SlashCommandChoice[];

  constructor(
    name: string,
    description: string,
    type: SlashCommandOptionType,
    required: boolean,
    choices: SlashCommandChoice[],
  ) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.required = required;
    this.choices = choices;
  }
}
