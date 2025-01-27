// Classes.
import { Prefix } from '../affix/lib/prefix.class';
import { Suffix } from '../affix/lib/suffix.class';
/**
 * @description
 * @export
 * @abstract
 * @class CommonName
 */
export abstract class CommonName<
  PrefixValue extends string = string,
  SuffixValue extends string = string,
> {
  /**
   * @description Returns the `Prefix` instance.
   * @public
   * @readonly
   * @type {Prefix}
   */
  public get prefix(): Prefix<PrefixValue> {
    return this.#prefix;
  }

  /**
   * @description Returns the `Suffix` instance.
   * @public
   * @readonly
   * @type {Suffix}
   */
  public get suffix(): Suffix<SuffixValue> {
    return this.#suffix;
  }

  /**
   * @description Private namespace for prefix of `Prefix`.
   * @type {Prefix}
   */
  #prefix;
  
  /**
   * @description Private namespace for suffix of `Suffix`.
   * @type {Suffix}
   */
  #suffix;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {{ prefix?: PrefixValue, suffix?: SuffixValue }} [param0={}] 
   * @param {PrefixValue} param0.prefix Optional prefix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {SuffixValue} param0.suffix Optional suffix of generic type variable `SuffixValue` constrained by the `string` type.
   */
  constructor({ prefix, suffix }: { prefix?: PrefixValue, suffix?: SuffixValue } = {}) {
    this.#prefix = new Prefix(prefix);
    this.#suffix = new Suffix(suffix);
  }
  
  /**
   * @description Sets the prefix for the name.
   * @public
   * @param {PrefixValue} value The prefix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [filter] Optional filter to sanitize prefix.
   * @returns {this} 
   */
  public setPrefix(
    value: PrefixValue,
    filter?: RegExp
  ): this {
    this.#prefix.set(value, filter);
    return this;
  }

  /**
   * @description Sets the suffix for the name.
   * @public
   * @param {SuffixValue} value The suffix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [filter] Optional filter to sanitize suffix.
   * @returns {this} 
   */
  public setSuffix(
    value: SuffixValue,
    filter?: RegExp
  ): this {
    this.#suffix.set(value, filter);
    return this;
  }
}
