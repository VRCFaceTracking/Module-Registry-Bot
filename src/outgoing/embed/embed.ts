import EmbedFooter from './embedFooter';
import EmbedAuthor from './embedAuthor';
import EmbedField from './embedField';

export default class Embed {
  public title: string;
  public description?: string;
  public color?: number;
  public type: string = 'rich';
  public footer?: EmbedFooter;
  public author?: EmbedAuthor;
  public fields?: EmbedField[];

  constructor(title: string, description?: string, color?: number) {
    this.title = title;
    this.description = description;
    this.color = color;
  }
}
