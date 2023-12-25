export default class EmbedField {
  public name: string;
  public value: string;
  public inline?: boolean;

  constructor(name: string, value: string, inline?: boolean) {
    this.name = name;
    this.value = value;
    this.inline = inline;
  }
}
