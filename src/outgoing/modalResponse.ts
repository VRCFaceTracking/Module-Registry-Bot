export default class ModalResponse {
  public custom_id: string;
  public title: string;
  public components: any[];

  constructor(custom_id: string, title: string, components: any[]) {
    this.custom_id = custom_id;
    this.title = title;
    this.components = components;
  }
}
