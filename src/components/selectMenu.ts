import Component from './component';
import SelectOption from './selectOption';
import { ComponentType } from './componentType';

export default class SelectMenu extends Component {
  public custom_id: string;
  public options?: SelectOption[];
  public placeholder?: string;
  public min_values?: number;
  public max_values?: number;
  public disabled?: boolean;

  constructor(
    custom_id: string,
    max_values?: number,
    min_values?: number,
    disabled?: boolean,
  ) {
    super();
    this.type = ComponentType.StringSelect;
    this.custom_id = custom_id;
    this.max_values = max_values;
    this.min_values = min_values;
    this.disabled = disabled;
    this.options = [];
  }

  addOption(label: string, value: string, description?: string) {
    this.options.push(new SelectOption(label, value, description));
  }
}
