/**
 * FIELD  TYPE  DESCRIPTION
 * user?  user object  the user this guild member represents
 * nick?  ?string  this user's guild nickname
 * avatar?  ?string  the member's guild avatar hash
 * roles  array of snowflakes  array of role object ids
 * joined_at  ISO8601 timestamp  when the user joined the guild
 * premium_since?  ?ISO8601 timestamp  when the user started boosting the guild
 * deaf  boolean  whether the user is deafened in voice channels
 * mute  boolean  whether the user is muted in voice channels
 * pending?  boolean  whether the user has not yet passed the guild's Membership Screening requirements
 * permissions?  string  total permissions of the member in the channel, including overwrites, returned when in the interaction object
 * communication_disabled_until?  ?ISO8601 timestamp  when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
 */
import User from './user';

export default class GuildMember {
  public user?: User;
  public nick?: string;
  public avatar?: string;
  public roles: string[];
  public joinedAt: Date;
  public premiumSince?: Date;
  public deaf: boolean;
  public mute: boolean;
  public pending?: boolean;
  public permissions?: string;
  public communicationDisabledUntil?: Date;

  constructor(body: any) {
    this.user = body.user;
    this.nick = body.nick;
    this.avatar = body.avatar;
    this.roles = body.roles;
    this.joinedAt = new Date(body.joined_at);
    this.premiumSince = body.premium_since;
    this.deaf = body.deaf;
    this.mute = body.mute;
    this.pending = body.pending;
    this.permissions = body.permissions;
    this.communicationDisabledUntil = body.communication_disabled_until;
  }
}
