export default class Modal {
  public custom_id: string;
  public title: string;
  public components: any[];

  constructor(customId: string, title: string, components: any[]) {
    this.custom_id = customId;
    this.title = title;
    this.components = components;
  }
}
