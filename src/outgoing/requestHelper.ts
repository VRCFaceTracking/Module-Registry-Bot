import fetch from 'node-fetch';
import MessageResponse from './message';

const BASE_URL = 'https://discord.com/api/v10';
const USER_AGENT: string = 'DiscordBot (https://benacle.com, 0.0.1)';
const BOT_TOKEN: string = process.env['BOT_TOKEN'];

export default class RequestHelper {
  static async request(method: string, url: string, body?: any) {
    url = BASE_URL + url;

    return await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bot ` + BOT_TOKEN,
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  static async sendMessageToChannel(
    channelId: string,
    message: MessageResponse,
  ) {
    return await this.request(
      'POST',
      '/channels/' + channelId + '/messages',
      message,
    );
  }

  static async sendDM(userId: string, message: string) {
    return await this.request('POST', '/users/@me/channels', {
      recipient_id: userId,
    }).then(async (res) => {
      const json = await res.json();
      return await this.request('POST', '/channels/' + json.id + '/messages', {
        content: message,
      });
    });
  }

  static async deleteMessage(channelId: string, messageId: string) {
    return await this.request(
      'DELETE',
      '/channels/' + channelId + '/messages/' + messageId,
    );
  }

  static async addRole(userId: string, roleId: string, guildId: string) {
    return await this.request(
      'PUT',
      '/guilds/' + guildId + '/members/' + userId + '/roles/' + roleId,
    );
  }

  static async removeRole(userId: string, roleId: string, guildId: string) {
    return await this.request(
      'DELETE',
      '/guilds/' + guildId + '/members/' + userId + '/roles/' + roleId,
    );
  }

  static async kickMember(userId: string, guildId: string) {
    return await this.request(
      'DELETE',
      '/guilds/' + guildId + '/members/' + userId,
    );
  }

  static async banMember(userId: string, guildId: string) {
    return await this.request('PUT', '/guilds/' + guildId + '/bans/' + userId);
  }

  static async unbanMember(userId: string, guildId: string) {
    return await this.request(
      'DELETE',
      '/guilds/' + guildId + '/bans/' + userId,
    );
  }
}
