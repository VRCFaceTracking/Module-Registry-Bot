export default class SelectOption {
  public label: string;
  public value: string;
  public description?: string;
  public emoji?: string;
  public default?: boolean;

  constructor(label: string, value: string, description?: string) {
    this.label = label;
    this.value = value;
    this.description = description;
  }
}
