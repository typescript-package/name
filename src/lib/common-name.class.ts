// Classes.
import { Prefix, Suffix } from '@typescript-package/affix';
import { NamePattern } from './name-pattern.abstract';
// Type.
import { NameAffix } from '../type';
/**
 * @description The `CommonName` class is an abstract class that provides a common structure for creating names with prefixes and suffixes.
 * @export
 * @abstract
 * @class CommonName
 * @template {string} [PrefixValue=string] The type of the prefix value, constrained by a `string` type.
 * @template {string} [SuffixValue=string] The type of the suffix value, constrained by a `string` type.
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
   * @description Returns the `Prefix<PrefixValue>` instance.
   * @public
   * @readonly
   * @type {Prefix<PrefixValue>}
   */
  public get prefix(): Prefix<PrefixValue> {
    return this.#prefix;
  }

  /**
   * @description Returns the `Suffix<SuffixValue>` instance.
   * @public
   * @readonly
   * @type {Suffix<SuffixValue>}
   */
  public get suffix(): Suffix<SuffixValue> {
    return this.#suffix;
  }

  /**
   * @description Private namespace for prefix of `Prefix`.
   * @type {Prefix<PrefixValue>}
   */
  #prefix: Prefix<PrefixValue>;
  
  /**
   * @description Private namespace for suffix of `Suffix`.
   * @type {Suffix<SuffixValue>}
   */
  #suffix: Suffix<SuffixValue>;

  /**
   * Creates an instance of `CommonName` child class.
   * @constructor
   * @param {NameAffix<PrefixValue, SuffixValue>} [param0={}] 
   * @param {NameAffix<PrefixValue, SuffixValue>} param0.prefix The default value for the instance of `Prefix`.
   * @param {NameAffix<PrefixValue, SuffixValue>} param0.suffix The default value for the instance of `Suffix`. 
   * @param {?RegExp} [pattern] The pattern to sanitize the name.
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
   * @returns {this} The `this` instance of `CommonName` child class.
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
   * @returns {this} The `this` instance of `CommonName` child class
   */
  public setSuffix(
    value: SuffixValue,
    pattern?: RegExp
  ): this {
    this.#suffix.set(value, pattern);
    return this;
  }
}
