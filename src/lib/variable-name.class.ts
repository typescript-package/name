// Class.
import { Name } from "./name.class";
/**
 * @description
 * @export
 * @class VariableName
 * @template {string} [Name=string] 
 * @extends {Name<'$', Name, ''>}
 */
export class VariableName<
  Name extends string = string
> extends Name<'$', Name, ''> {
  constructor(name: Name) {
    super(name, { prefix: '$', suffix: '' });
  }
}
