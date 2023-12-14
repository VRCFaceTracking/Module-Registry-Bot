/**
 *
 * FIELD  TYPE  DESCRIPTION
 * id  snowflake  ID of the interaction
 * application_id  snowflake  ID of the application this interaction is for
 * type  interaction type  Type of interaction
 * data?*  interaction data  Interaction data payload
 * guild_id?  snowflake  Guild that the interaction was sent from
 * channel_id?  snowflake  Channel that the interaction was sent from
 * member?**  guild member object  Guild member data for the invoking user, including permissions
 * user?  user object  User object for the invoking user, if invoked in a DM
 * token  string  Continuation token for responding to the interaction
 * version  integer  Read-only property, always 1
 * message?  message object  For components, the message they were attached to
 * app_permissions?  string  Bitwise set of permissions the app or bot has within the channel the interaction was sent from
 * locale?***  string  Selected language of the invoking user
 * guild_locale?  string  Guild's preferred locale, if invoked in a guild
 */
import { InteractionType } from './interactionType';
import GuildMember from '../guildMember';
import User from '../user';
import Message from '../outgoing/message';

export default class Interaction {
  public id: string;
  public applicationId: string;
  public type: InteractionType;
  public data?: any;
  public guildId?: string;
  public channelId?: string;
  public member?: GuildMember;
  public user?: User;
  public token: string;
  public version: number;
  public message?: Message; // We don't care about this
  public appPermissions?: string;
  public locale?: string;
  public guildLocale?: string;

  constructor(body: any) {
    console.log(body);
    this.id = body.id;
    this.applicationId = body.application_id;
    this.type = body.type;
    this.data = body.data;
    this.guildId = body.guild_id;
    this.channelId = body.channel_id;
    this.member = body.member;
    this.user = body.user;
    this.token = body.token;
    this.version = body.version;
    this.message = body.message;
    this.appPermissions = body.app_permissions;
    this.locale = body.locale;
    this.guildLocale = body.guild_locale;
  }
}
