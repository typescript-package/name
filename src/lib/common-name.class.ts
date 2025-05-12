// Classes.
import { Prefix, Suffix } from '@typescript-package/affix';
import { NamePattern } from './name-pattern.class';
// Type.
import { NameAffix } from '../type';
/**
 * @description
 * @export
 * @abstract
 * @class CommonName
 * @template {string} [PrefixValue=string] 
 * @template {string} [SuffixValue=string] 
 */
export abstract class CommonName<
  PrefixValue extends string = string,
  SuffixValue extends string = string,
> extends NamePattern {
  /**
   * @description Returns the `string` tag representation of the `CommonName` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return CommonName.name;
  }

  /**
   * @description Returns the `Prefix` instance.
   * @public
   * @readonly
   * @type {Prefix}
   */
  public get prefix() {
    return this.#prefix;
  }

  /**
   * @description Returns the `Suffix` instance.
   * @public
   * @readonly
   * @type {Suffix}
   */
  public get suffix() {
    return this.#suffix;
  }

  /**
   * @description Private namespace for prefix of `Prefix`.
   * @type {Prefix}
   */
  #prefix: Prefix;
  
  /**
   * @description Private namespace for suffix of `Suffix`.
   * @type {Suffix}
   */
  #suffix: Suffix;
  
  /**
   * Creates an instance of child class.
   * @constructor
   * @param {NameAffix<PrefixValue, SuffixValue>} [param0={}] 
   * @param {NameAffix<PrefixValue, SuffixValue>} param0.prefix 
   * @param {NameAffix<PrefixValue, SuffixValue>} param0.suffix 
   * @param {?RegExp} [pattern] 
   */
  constructor(
    {prefix, suffix}: NameAffix<PrefixValue, SuffixValue> = {},
    pattern?: RegExp
  ) {
    super(pattern);
    this.#prefix = prefix instanceof Prefix
      ? prefix
      : typeof prefix === 'object' 
        ? new Prefix(prefix.value, prefix.pattern || pattern)
        : new Prefix(prefix, pattern);
    this.#suffix = suffix instanceof Suffix
      ? suffix
      : typeof suffix === 'object'
        ? new Suffix(suffix.value, suffix.pattern || pattern)
        : new Suffix(suffix, pattern);
  }

  /**
   * @description Sets the `prefix` for the name with the `pattern` to sanitize.
   * @public
   * @param {PrefixValue} value The prefix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [pattern] Optional pattern to sanitize prefix.
   * @returns {this} 
   */
  public setPrefix(
    value: PrefixValue,
    pattern?: RegExp
  ): this {
    this.#prefix.set(value, pattern);
    return this;
  }

  /**
   * @description Sets the `suffix` for the name with the `pattern` to sanitize.
   * @public
   * @param {SuffixValue} value The suffix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [pattern] Optional pattern to sanitize suffix.
   * @returns {this} 
   */
  public setSuffix(
    value: SuffixValue,
    pattern?: RegExp
  ): this {
    this.#suffix.set(value, pattern);
    return this;
  }
}
