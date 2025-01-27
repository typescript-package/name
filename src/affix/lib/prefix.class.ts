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
   * @description Sanitizes the prefix with a `filter`.
   * @public
   * @param {string} value 
   * @param {RegExp} [filter=Prefix.filter] 
   * @returns {string} 
   */
  public static sanitize(value: string, filter: RegExp = Prefix.filter): string {
    return value.replace(filter, '');
  }

  /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override filter: RegExp = super.filter;
}
