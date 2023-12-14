/**
 FIELD	TYPE	DESCRIPTION	REQUIRED OAUTH2 SCOPE
 id	snowflake	the user's id	identify
 username	string	the user's username, not unique across the platform	identify
 discriminator	string	the user's 4-digit discord-tag	identify
 avatar	?string	the user's avatar hash	identify
 bot?	boolean	whether the user belongs to an OAuth2 application	identify
 system?	boolean	whether the user is an Official Discord System user (part of the urgent message system)	identify
 mfa_enabled?	boolean	whether the user has two factor enabled on their account	identify
 banner?	?string	the user's banner hash	identify
 accent_color?	?integer	the user's banner color encoded as an integer representation of hexadecimal color code	identify
 locale?	string	the user's chosen language option	identify
 verified?	boolean	whether the email on this account has been verified	email
 email?	?string	the user's email	email
 flags?	integer	the flags on a user's account	identify
 premium_type?	integer	the type of Nitro subscription on a user's account	identify
 public_flags?	integer	the public flags on a user's account	identify
 */

export default class User {
  public id: string;
  public username: string;
  public discriminator: string;
  public avatar?: string;
  public bot?: boolean;
  public system?: boolean;
  public mfaEnabled?: boolean;
  public banner?: string;
  public accentColor?: number;
  public locale?: string;
  public verified?: boolean;
  public email?: string;
  public flags?: number;
  public premiumType?: number;
  public publicFlags?: number;

  constructor(body: any) {
    this.id = body.id;
    this.username = body.username;
    this.discriminator = body.discriminator;
    this.avatar = body.avatar;
    this.bot = body.bot;
    this.system = body.system;
    this.mfaEnabled = body.mfa_enabled;
    this.banner = body.banner;
    this.accentColor = body.accent_color;
    this.locale = body.locale;
    this.verified = body.verified;
    this.email = body.email;
    this.flags = body.flags;
    this.premiumType = body.premium_type;
    this.publicFlags = body.public_flags;
  }
}
