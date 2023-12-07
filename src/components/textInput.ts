import Component from './component';
import { ComponentType } from './componentType';

export enum TextInputStyle {
  Short = 1,
  Paragraph = 2,
}

export default class TextInput extends Component {
  public custom_id: string;
  public placeholder?: string;
  public style: TextInputStyle;
  public label: string;
  public min_length?: number;
  public max_length?: number;
  public required?: boolean;
  public value?: string;

  constructor(
    customId: string,
    label: string,
    minLength: number,
    maxLength: number,
    style: TextInputStyle,
    required: boolean = true,
  ) {
    super();
    this.type = ComponentType.TextInput;
    this.custom_id = customId;
    this.label = label;
    this.min_length = minLength;
    this.max_length = maxLength;
    this.style = style;
    this.required = required;
  }
}
