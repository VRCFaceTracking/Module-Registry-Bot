import Embed from './embed/embed';
import ActionRow from '../components/actionRow';

export default class Message {
  public id?: string;
  public channel_id?: string;
  public embeds?: Embed[];
  public components?: ActionRow[];
  public flags?: number;
  public content?: string;

  constructor(ephemeral: boolean = false, message: string = null) {
    this.content = message;

    // 1 << 6
    if (ephemeral) this.flags = this.flags | 0b01000000;
  }
}
