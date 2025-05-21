// Classes.
import { Prefix, Suffix } from '@typescript-package/affix';
import { NamePattern } from './name-pattern.abstract';
// Type.
import { AffixedName } from '../type';
// Interface.
import { NameAffix, NameConfiguration, NameOptions } from '../interface';
/**
 * @description The `NameCommon` class is an abstract class that provides a common structure for creating names with prefixes and suffixes.
 * @export
 * @abstract
 * @class NameCommon
 * @template {string} [PrefixValue=string] The type of the prefix value, constrained by a `string` type.
 * @template {string} [NameValue=string] The type of the name value, constrained by a `string` type.
 * @template {string} [SuffixValue=string] The type of the suffix value, constrained by a `string` type.
 * @template {string} [Delimiter=string] The type of the delimiter, constrained by a `string` type.
 */
export abstract class NameCommon<
  PrefixValue extends string = string,
  NameValue extends string = string,
  SuffixValue extends string = string,
  Delimiter extends string = string
> extends NamePattern {
  //#region static.
  /**
   * @description
   * @public
   * @static
   * @template {string} [PrefixValue=string] 
   * @template {string} [NameValue=string] 
   * @template {string} [SuffixValue=string] 
   * @template {string} [Delimiter=string] 
   * @param {{
   *       delimiter?: Delimiter,
   *       name?: NameValue,
   *       prefix?: PrefixValue,
   *       suffix?: SuffixValue,
   *     }} [param0={}] 
   * @param {Delimiter} param0.delimiter 
   * @param {NameValue} param0.name 
   * @param {PrefixValue} param0.prefix 
   * @param {SuffixValue} param0.suffix 
   * @returns {AffixedName<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  public static compose<
    PrefixValue extends string = string,
    NameValue extends string = string,
    SuffixValue extends string = string,
    Delimiter extends string = string
  >(
    { delimiter, name, prefix, suffix }: {
      delimiter?: Delimiter,
      name?: NameValue,
      prefix?: PrefixValue,
      suffix?: SuffixValue,
    } = {}
  ): AffixedName<PrefixValue, NameValue, SuffixValue, Delimiter> {
    const parts = [];
    prefix && parts.push(prefix);
    parts.push(name);
    suffix && parts.push(suffix);
    return parts.join(delimiter) as AffixedName<
      PrefixValue,
      NameValue,
      SuffixValue,
      Delimiter
    >;
  }

  /**
   * @description
   * @public
   * @static
   * @type {string}
   */
  public static delimiter: string = '';

  /**
   * @description The default value for the instance of `Prefix`.
   * @public
   * @static
   * @type {?string}
   */
  public static prefix?: string;

  /**
   * @description The default value for the instance of `Suffix`.
   * @public
   * @static
   * @type {?string}
   */
  public static suffix?: string;

  /**
   * @description Returns the `string` tag representation of the `CommonName` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return NameCommon.name;
  }
  //#endregion
  //#region instance.
  /**
   * @description Returns the `string` delimiter. Default value is `CommonName.delimiter`.
   * @public
   * @readonly
   * @type {Delimiter}
   */
  public get delimiter(): Delimiter {
    return this.#delimiter;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {NameConfiguration<PrefixValue, NameValue, SuffixValue, Delimiter>}
   */
  public get configuration(): NameConfiguration<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return {
      prefix: {
        prefix: this.#prefix.pattern
          ? { value: this.#prefix.value, pattern: this.#prefix.pattern }
          : this.#prefix.value
      },
      suffix: {
        suffix: this.#suffix.pattern
          ? { value: this.#suffix.value, pattern: this.#suffix.pattern }
          : this.#suffix.value
      },
      name: this.#name,
      delimiter: this.#delimiter,
      pattern: super.pattern
    };
  }

  /**
   * @description Returns privately stored name between the `prefix`, and `suffix`.
   * @public
   * @readonly
   * @type {NameValue}
   */
  public get name(): NameValue {
    return this.#name;
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
   * @description Returns the value, built from the `prefix`, `name`, and `suffix`.
   * @public
   * @readonly
   * @type {AffixedName<PrefixValue, NameValue, SuffixValue, Delimiter>}
   */
  public get value(): AffixedName<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return this.#value;
  }

  /**
   * @description Returns the `string` delimiter. Default value is `CommonName.delimiter`.
   * @type {Delimiter}
   */
  #delimiter: Delimiter;

  /**
   * @description Privately stored name of generic type variable `Name`.
   * @type {NameValue}
   */
  #name: NameValue;

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
   * @description
   * @type {AffixedName<PrefixValue, NameValue, SuffixValue, Delimiter>}
   */
  #value: AffixedName<PrefixValue, NameValue, SuffixValue, Delimiter>;
  //#endregion

  /**
   * Creates an instance of `CommonName` child class.
   * @constructor
   * @param {NameValue} name The name of generic type variable `Name` constrained by the `string` type.
   * @param {NameAffix<PrefixValue, SuffixValue>} [param0={}] The object containing the prefix and suffix values.
   * @param {NameAffix<PrefixValue, SuffixValue>} param0.prefix The default value for the instance of `Prefix`.
   * @param {NameAffix<PrefixValue, SuffixValue>} param0.suffix The default value for the instance of `Suffix`.
   * @param {Delimiter} [delimiter] The delimiter to separate the prefix and suffix.
   * @param {?RegExp} [pattern] The pattern to sanitize the name.
   */
  constructor(
    name: NameValue,
    {prefix, suffix}: NameAffix<PrefixValue, SuffixValue> = {},
    delimiter?: Delimiter,
    pattern?: RegExp
  ) {
    super(pattern);
    this.#name = NameCommon.sanitize(name, pattern);
    this.#delimiter = delimiter ?? NameCommon.delimiter as Delimiter;
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
    this.#value = this.#compose();
  }

  /**
   * @description Sets the properties of the `Name` instance.
   * @public
   * @param {SetNameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} [param0={}] The properties to set.
   * @param {SetNameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.delimiter The delimiter to use between the prefix, name, and suffix.
   * @param {SetNameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.name The name of generic type variable `Name`.
   * @param {SetNameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.pattern The pattern to use for sanitizing the name.
   * @param {SetNameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.prefix The prefix for the new name.
   * @param {SetNameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.suffix The suffix for the new name.
   * @returns {NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  public set(
    { delimiter, name, pattern, prefix, suffix }: NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter> = {}
  ): NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter> {
    typeof prefix === 'string' && this.prefix.set(prefix);
    typeof suffix === 'string' && this.suffix.set(suffix);
    pattern && super.setPattern(pattern);
    name && this.setName(name);
    delimiter && this.setDelimiter(delimiter);
    this.#compose();
    return this;
  }

  /**
   * @description Returns the `string` representation of the `Name` class when used in `String(instance)`.
   * @public
   * @template {PrefixValue | string} [CustomPrefix=PrefixValue] 
   * @template {NameValue | string} [CustomName=NameValue] 
   * @template {SuffixValue | string} [CustomSuffix=SuffixValue] 
   * @template {Delimiter | string} [CustomDelimiter=Delimiter] 
   * @param {{
   *       name?: CustomName,
   *       prefix?: CustomPrefix,
   *       suffix?: CustomSuffix,
   *     }} [param0={}] 
   * @param {CustomName} param0.name 
   * @param {CustomPrefix} param0.prefix 
   * @param {CustomSuffix} param0.suffix 
   * @returns {AffixedName<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>} 
   */
  public compose<
    CustomPrefix extends PrefixValue | string = PrefixValue,
    CustomName extends NameValue | string = NameValue,
    CustomSuffix extends SuffixValue | string = SuffixValue,
    CustomDelimiter extends Delimiter | string = Delimiter
  >(
    { delimiter, name, prefix, suffix }: {
      delimiter?: CustomDelimiter,
      name?: CustomName,
      prefix?: CustomPrefix,
      suffix?: CustomSuffix,
    } = {}
  ): AffixedName<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter> {
    const resolvedPrefix = prefix ?? this.#prefix.value;
    const resolvedName = name ?? this.#name;
    const resolvedSuffix = suffix ?? this.#suffix.value;
    const resolvedDelimiter = delimiter ?? this.#delimiter;

    const parts = [];

    resolvedPrefix && parts.push(resolvedPrefix);
    parts.push(resolvedName);
    resolvedSuffix && parts.push(resolvedSuffix);

    return parts.join(resolvedDelimiter) as AffixedName<
      CustomPrefix,
      CustomName,
      CustomSuffix,
      CustomDelimiter
    >;
  }

  /**
   * @description
   * @public
   * @param {Delimiter} value 
   * @returns {NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  public setDelimiter(value: Delimiter): NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter> {
    this.#delimiter = value;
    this.#compose();
    return this;
  }

  /**
   * @description Sets the `name` between the `prefix`, and `suffix`.
   * @public
   * @param {NameValue} name The name of generic type variable `Name`.
   * @returns {NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter>} The `this` instance of `Name`.
   */
  public setName(name: NameValue): NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter> {
    (this.#name = NameCommon.sanitize(name, super.pattern));
    this.#compose();
    return this;
  }

  /**
   * @description Sets the `prefix` for the name with the `pattern` to sanitize.
   * @public
   * @param {PrefixValue} value The prefix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [pattern] Optional pattern to sanitize prefix.
   * @returns {NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter>} The `this` instance of `CommonName` child class.
   */
  public setPrefix(
    value: PrefixValue,
    pattern?: RegExp
  ): NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter> {
    this.#prefix.set(value, pattern);
    this.#compose();
    return this;
  }

  /**
   * @description Sets the `suffix` for the name with the `pattern` to sanitize.
   * @public
   * @param {SuffixValue} value The suffix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [pattern] Optional pattern to sanitize suffix.
   * @returns {NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter>} The `this` instance of `CommonName` child class.
   */
  public setSuffix(
    value: SuffixValue,
    pattern?: RegExp
  ): NameCommon<PrefixValue, NameValue, SuffixValue, Delimiter> {
    this.#suffix.set(value, pattern);
    this.#compose();
    return this;
  }

  /**
   * @description Returns the JSON of the prefix, suffix, and delimiter.
   * @public
   * @returns {{ name: NameValue; prefix: PrefixValue; suffix: SuffixValue; delimiter: Delimiter; }} 
   */
  public toJSON(): { name: NameValue; prefix: PrefixValue; suffix: SuffixValue; delimiter: Delimiter; } {
    return {
      name: this.#name,
      prefix: this.prefix.value,
      suffix: this.suffix.value,
      delimiter: this.delimiter
    };
  }

  /**
   * @description Returns the `string` representation of the prefix, suffix, and delimiter.
   * @public
   * @returns {*} 
   */
  public toJSONString(): string { 
    return JSON.stringify(this.toJSON());
  }

  /**
   * @description Returns composed name from the `prefix`, `name`, `delimiter` and `suffix` and assign it to the `#value`.
   * @returns {AffixedName<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  #compose() {
    return NameCommon.compose({
      delimiter: this.#delimiter,
      name: this.#name,
      prefix: this.#prefix.value,
      suffix: this.#suffix.value
    });
  }
}
