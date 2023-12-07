/**
 * FIELD  TYPE  DESCRIPTION
 * id  snowflake  the ID of the invoked command
 * name  string  the name of the invoked command
 * type  integer  the type of the invoked command
 * resolved?  resolved data  converted users + roles + channels + attachments
 * options?*  array of application command interaction data option  the params + values from the user
 * guild_id?  snowflake  the id of the guild the command is registered to
 * target_id?  snowflake  id of the user or message targeted by a user or message command
 */
import InteractionDataOption from './interactionDataOption';

export default class ApplicationCommandInteractionData {
  public id: number;
  public name: string;
  public type: number;
  public resolved?: any;
  public options?: InteractionDataOption[];
  public guildId?: string;
  public targetId?: string;

  constructor(body: any) {
    this.id = body.id;
    this.name = body.name;
    this.type = body.type;
    this.resolved = body.resolved;
    this.options = body.options;
    this.guildId = body.guild_id;
    this.targetId = body.target_id;
  }
}
