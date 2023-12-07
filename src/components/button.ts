import Component from './component';
import { ComponentType } from './componentType';

export enum ButtonStyle {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Link = 5,
}

export default class Button extends Component {
  public style: ButtonStyle;
  public label: string;
  public emoji?: string;
  public custom_id?: string;
  public url?: string;
  public disabled?: boolean;

  constructor(label: string, style: ButtonStyle, customId: string) {
    super();
    this.type = ComponentType.Button;
    this.label = label;
    this.style = style;
    this.custom_id = customId;
  }
}
