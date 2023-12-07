import { ComponentType } from '../components/componentType';

export default class MessageComponentInteractionData {
  public custom_id: string;
  public component_type: ComponentType;
  public values?: any[];

  constructor(body: any) {
    this.custom_id = body.custom_id;
    this.component_type = body.component_type;
    this.values = body.values;
  }
}
