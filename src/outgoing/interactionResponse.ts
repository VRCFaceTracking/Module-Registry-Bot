import { InteractionCallbackType } from './interactionCallbackType';

export default class InteractionResponse {
  public type: InteractionCallbackType;
  public data?: any;

  constructor(type: InteractionCallbackType, data?: any) {
    this.type = type;
    this.data = data;
  }
}
