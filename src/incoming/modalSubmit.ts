export default class ModalSubmit {
  public customId: string;
  public components: any[];

  constructor(body: any) {
    this.customId = body.custom_id;
    this.components = body.components;
  }
}
