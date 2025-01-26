// Class.
import { Affix } from "./affix.abstract";
/**
 * @export
 * @class Suffix
 * @extends {Affix}
 */

/**
 * @description A class to manage suffixes that can be applied to strings.
 * @export
 * @class Suffix
 * @template {string} [Value=string] The type of suffix constrained by the `string`.
 * @extends {Affix<Value>}
 */
export class Suffix<Value extends string = string> extends Affix<Value> {
    /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override filter: RegExp = super.filter;
}
