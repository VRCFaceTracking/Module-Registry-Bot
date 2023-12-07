/**
 * name  string  Name of the parameter
 * type  integer  Value of application command option type
 * value?  string, integer, double, or boolean  Value of the option resulting from user input
 * options?  array of application command interaction data option  Present if this option is a group or subcommand
 * focused?  boolean  true if this option is the currently focused option for autocomplete
 */

export default class InteractionDataOption {
  public name: string;
  public type: number;
  public value?: string | number | boolean;
  public options?: InteractionDataOption[];
  public focused?: boolean;

  constructor(body: any) {
    this.name = body.name;
    this.type = body.type;
    this.value = body.value;
    this.options = body.options;
    this.focused = body.focused;
  }
}
