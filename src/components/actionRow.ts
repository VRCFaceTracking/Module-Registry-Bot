import Component from './component';
import { ComponentType } from './componentType';

export default class ActionRow extends Component {
  public components: Component[];

  constructor(components: Component[]) {
    super();
    this.type = ComponentType.ActionRow;
    this.components = components;
  }
}
