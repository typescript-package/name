// Class.
import { Affix } from "./affix.abstract";
/**
 * @description A class to manage suffixes that can be applied to strings.
 * @export
 * @class Suffix
 * @template {string} [Value=string] The type of suffix constrained by the `string`.
 * @extends {Affix<Value>}
 */
export class Suffix<Value extends string = string> extends Affix<Value> {
  /**
   * @description Sanitizes the suffix with a `filter`.
   * @public
   * @param {string} value 
   * @param {RegExp} [filter=Suffix.filter] 
   * @returns {string} 
   */
  public static sanitize(value: string, filter: RegExp = Suffix.filter): string {
    return value.replace(filter, '');
  }
    /**
   * @inheritdoc
   * @public
   * @static
   * @type {RegExp}
   */
  public static override filter: RegExp = /[^a-zA-Z0-9$_-]/g;
}
