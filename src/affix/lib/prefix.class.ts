// Class.
import { Affix } from "./affix.abstract";
/**
 * @description A class to manage prefixes that can be applied to strings.
 * @export
 * @class Prefix
 * @template {string} [Value=string] The type of prefix constrained by the `string`.
 * @extends {Affix<Value>}
 */
export class Prefix<Value extends string = string> extends Affix<Value> {
  /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override filter: RegExp = super.filter;
}
