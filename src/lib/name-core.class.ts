// Classes.
import { Prefix, Suffix } from '@typescript-package/affix';
import { NamePattern } from './name-pattern.abstract';
// Type.
import { AdfixedName } from '@typedly/name';
// Interface.
import { AffixConstructor } from '@typedly/affix';
import { NameAdfix, NameConfiguration, NameOptions } from '@typedly/name';
/**
 * @description The `NameCore` class is an abstract class that provides a common structure for creating names with prefixes and suffixes.
 * @export
 * @abstract
 * @class NameCore
 * @template {string} [PrefixValue=''] The type of the prefix value, constrained by a `string` type. Defaults to an empty string.
 * @template {string} [NameValue=string] The type of the name value, constrained by a `string` type.
 * @template {string} [SuffixValue=''] The type of the suffix value, constrained by a `string` type. Defaults to an empty string.
 * @template {string} [Delimiter=''] The type of the delimiter, constrained by a `string` type. Defaults to an empty string.
 * @template {Prefix<PrefixValue>} [PrefixType=Prefix<PrefixValue>] The type of the prefix type, constrained by `Prefix<PrefixValue>`.
 * @template {Suffix<SuffixValue>} [SuffixType=Suffix<SuffixValue>] The type of the suffix type, constrained by `Suffix<SuffixValue>`.
 * @extends {NamePattern}
 */
export abstract class NameCore<
  PrefixValue extends string = '',
  NameValue extends string = string,
  SuffixValue extends string = '',
  Delimiter extends string = '',
  PrefixType extends Prefix<PrefixValue> = Prefix<PrefixValue>,
  SuffixType extends Suffix<SuffixValue> = Suffix<SuffixValue>
> extends NamePattern {
  //#region static.
  /**
   * @description Gets the sanitized prefix value from the provided prefix options.
   * @public
   * @static
   * @template {string} [PrefixValue=''] The type of the prefix value, constrained by a `string` type. Defaults to an empty string.
   * @param {Pick<NameOptions<PrefixValue>, 'prefix'>['prefix']} prefix The prefix of picked `prefix` from `NameOptions` interface.
   * @param {?RegExp} [pattern] The pattern to sanitize the prefix.
   * @returns {PrefixValue} The sanitized prefix value.
   */
  public static getPrefix<PrefixValue extends string = ''>(
    prefix: Pick<NameOptions<PrefixValue>, 'prefix'>['prefix'],
    pattern?: RegExp
  ): PrefixValue {
    return typeof prefix === 'string'
      ? Prefix.sanitize(prefix, pattern)
      : typeof prefix === 'object'
        ? prefix.value ? (prefix = Prefix.sanitize(prefix.value, prefix.pattern ?? pattern))
        : '' as PrefixValue
      : '' as PrefixValue;
  }

  /**
   * @description Gets the sanitized suffix value from the provided suffix options.
   * @public
   * @static
   * @template {string} [SuffixValue=''] The type of the suffix value, constrained by a `string` type. Defaults to an empty string.
   * @param {Pick<NameOptions<any, any, SuffixValue>, 'suffix'>['suffix']} suffix The suffix of picked `suffix` from `NameOptions` interface.
   * @param {?RegExp} [pattern] The pattern to sanitize the suffix.
   * @returns {SuffixValue} The sanitized suffix value.
   */
  public static getSuffix<SuffixValue extends string = ''>(
    suffix: Pick<NameOptions<any, any, SuffixValue>, 'suffix'>['suffix'],
    pattern?: RegExp
  ): SuffixValue {
    return typeof suffix === 'string'
      ? Suffix.sanitize(suffix, pattern)
      : typeof suffix === 'object'
        ? suffix.value ? (suffix = Suffix.sanitize(suffix.value, suffix.pattern ?? pattern))
        : '' as SuffixValue
      : '' as SuffixValue;
  }

  /**
   * @description Composes a name from the given parts.
   * @public
   * @static
   * @template {string} [PrefixValue=''] The type of the prefix value, constrained by a `string` type.
   * @template {string} [NameValue=string] The type of the name value, constrained by a `string` type.
   * @template {string} [SuffixValue=string] The type of the suffix value, constrained by a `string` type.
   * @template {string} [Delimiter=string] The type of the delimiter, constrained by a `string` type.
   * @param {(NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter> & {name: NameValue})} param0 
   * @param {string} param0.delimiter The delimiter to use between the prefix, name, and suffix.
   * @param {string} param0.name The name of generic type variable `Name` to define name.
   * @param {string} param0.prefix The prefix of generic type variable `Prefix` to define name.
   * @param {string} param0.suffix The suffix of generic type variable `Suffix` to define name.
   * @param {?RegExp} [pattern] The pattern to sanitize the name.
   * @returns {AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  public static compose<
    PrefixValue extends string = '',
    NameValue extends string = string,
    SuffixValue extends string = '',
    Delimiter extends string = ''
  >(
    { delimiter, name, prefix, suffix }: NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter> & {name: NameValue},
    pattern?: RegExp
  ): AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return this.#addToParts(
      this.getPrefix(prefix, pattern),
      NameCore.sanitize(name, pattern),
      this.getSuffix(suffix, pattern),
      delimiter ?? NameCore.delimiter as Delimiter,
    );
  }

  /**
   * @description Adds the prefix, name, and suffix to the parts array and returns the composed name.
   * @static
   * @template {string} [PrefixValue=''] The type of the prefix value, constrained by a `string` type. Defaults to an empty string.
   * @template {string} [NameValue=string] The type of the name value, constrained by a `string` type. Defaults to `string`.
   * @template {string} [SuffixValue=''] The type of the suffix value, constrained by a `string` type. Defaults to an empty string.
   * @template {string} [Delimiter=''] The type of the delimiter, constrained by a `string` type. Defaults to an empty string.
   * @param {PrefixValue} prefix The prefix of generic type variable `Prefix` to define name.
   * @param {NameValue} name The name of generic type variable `Name` to define name.
   * @param {SuffixValue} suffix The suffix of generic type variable `Suffix` to define name.
   * @param {Delimiter} delimiter The delimiter to use between the prefix, name, and suffix.
   * @param {string[]} [parts=[]] 
   * @returns {AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  static #addToParts<
    PrefixValue extends string = '',
    NameValue extends string = string,
    SuffixValue extends string = '',
    Delimiter extends string = ''
  >(
    prefix: PrefixValue,
    name: NameValue,
    suffix: SuffixValue,
    delimiter: Delimiter,
    parts: string[] = [],
  ): AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return (
      prefix.length > 0 && parts.push(prefix),
      parts.push(name),
      suffix.length > 0 && parts.push(suffix),
      parts
    ).join(delimiter) as AdfixedName<
      PrefixValue,
      NameValue,
      SuffixValue,
      Delimiter
    >;
  }

  /**
   * @description The default delimiter used to separate name parts.
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
   * @description Returns the `string` tag representation of the `NameCore` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return NameCore.name;
  }
  //#endregion static.

  //#region instance.
  /**
   * @description Returns the `string` delimiter. Default value is `NameCore.delimiter`.
   * @public
   * @readonly
   * @type {Delimiter}
   */
  public get delimiter(): Delimiter {
    return this.#delimiter;
  }

  /**
   * @description Returns the `NameConfiguration` object containing the prefix, suffix, name, and delimiter.
   * @public
   * @readonly
   * @type {NameConfiguration<PrefixValue, NameValue, SuffixValue, Delimiter>}
   */
  public get configuration(): NameConfiguration<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return {
      prefix: this.#prefix.pattern
          ? { value: this.#prefix.value, pattern: this.#prefix.pattern }
          : this.#prefix.value,
      suffix: this.#suffix.pattern
          ? { value: this.#suffix.value, pattern: this.#suffix.pattern }
          : this.#suffix.value,
      name: this.#name,
      delimiter: this.#delimiter,
      pattern: super.pattern
    };
  }

  /**
   * @description Returns privately stored name between the `prefix`, and `suffix`.
   * @public
   * @readonly
   * @type {NameValue} The name of generic type variable `Name` constrained by the `string` type.
   */
  public get name(): NameValue {
    return this.#name;
  }

  /**
   * @description Returns the `PrefixFactory` instance.
   * @public
   * @readonly
   * @type {PrefixType}
   */
  public get prefix(): PrefixType {
    return this.#prefix;
  }

  /**
   * @description Returns the `SuffixFactory` instance.
   * @public
   * @readonly
   * @type {SuffixType}
   */
  public get suffix(): SuffixType {
    return this.#suffix;
  }

  /**
   * @description Returns the value, built from the `prefix`, `name`, and `suffix`.
   * @public
   * @readonly
   * @type {AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter>}
   */
  public get value(): AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return this.#value;
  }

  /**
   * @description Returns the `string` delimiter. Default value is `NameCore.delimiter`.
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
   * @type {PrefixType}
   */
  #prefix: PrefixType;
  
  /**
   * @description Private namespace for suffix of `Suffix`.
   * @type {SuffixType}
   */
  #suffix: SuffixType;

  /**
   * @description
   * @type {AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter>}
   */
  #value: AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter>;
  //#endregion

  /**
   * Creates an instance of `NameCore` child class.
   * @constructor
   * @param {NameValue} name The name of generic type variable `Name` constrained by the `string` type.
   * @param {NameAdfix<PrefixValue, SuffixValue>} [param0={}] The object containing the prefix and suffix values.
   * @param {NameAdfix<PrefixValue, SuffixValue>} param0.prefix The default value for the instance of `Prefix`.
   * @param {NameAdfix<PrefixValue, SuffixValue>} param0.suffix The default value for the instance of `Suffix`.
   * @param {Delimiter} [delimiter] The delimiter to separate the prefix and suffix.
   * @param {?RegExp} [pattern] The pattern to sanitize the name.
   * @param {AffixConstructor<PrefixValue, Prefix<PrefixValue>, PrefixType>} [prefixClass=Prefix as unknown as AffixConstructor<PrefixValue, PrefixType, PrefixType>] 
   * @param {AffixConstructor<SuffixValue, Suffix<SuffixValue>, SuffixType>} [suffixClass=Suffix as unknown as AffixConstructor<SuffixValue, SuffixType, SuffixType>] 
   */
  constructor(
    name: NameValue,
    {prefix, suffix}: NameAdfix<PrefixValue, SuffixValue> = {},
    delimiter?: Delimiter,
    pattern?: RegExp,
    prefixClass: AffixConstructor<PrefixValue, Prefix<PrefixValue>, PrefixType> = Prefix as unknown as AffixConstructor<PrefixValue, PrefixType, PrefixType>,
    suffixClass: AffixConstructor<SuffixValue, Suffix<SuffixValue>, SuffixType> = Suffix as unknown as AffixConstructor<SuffixValue, SuffixType, SuffixType>
  ) {
    super(pattern);
    this.#name = NameCore.sanitize(name, pattern);
    this.#delimiter = delimiter ?? NameCore.delimiter as Delimiter;
    this.#prefix = new prefixClass(
      typeof prefix === 'string' ? prefix : typeof prefix === 'object' ? prefix.value : '' as PrefixValue,
      typeof prefix === 'object' ? prefix.pattern : pattern
    );
    this.#suffix = new suffixClass(
      typeof suffix === 'string' ? suffix : typeof suffix === 'object' ? suffix.value : '' as SuffixValue,
      typeof suffix === 'object' ? suffix.pattern : pattern
    );
    this.#value = this.#compose();
  }

  /**
   * @description Sets the properties of the `NameCore` instance.
   * @public
   * @param {NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} [param0={}] The properties to set.
   * @param {NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.delimiter The delimiter to use between the prefix, name, and suffix.
   * @param {NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.name The name of generic type variable `Name`.
   * @param {NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.pattern The pattern to use for sanitizing the name.
   * @param {NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.prefix The prefix for the new name.
   * @param {NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter>} param0.suffix The suffix for the new name.
   * @returns {NameCore<PrefixValue, NameValue, SuffixValue, Delimiter>} The `this` instance of `NameCore` child class.
   */
  public set(
    { delimiter, name, pattern, prefix, suffix }: NameOptions<PrefixValue, NameValue, SuffixValue, Delimiter> = {}
  ): NameCore<PrefixValue, NameValue, SuffixValue, Delimiter> {
    typeof prefix === 'string' && this.#prefix.set(prefix);
    typeof suffix === 'string' && this.#suffix.set(suffix);
    pattern && super.setPattern(pattern);
    name && this.setName(name);
    delimiter && this.setDelimiter(delimiter);
    this.updateValue();
    return this;
  }

  /**
   * @description Returns the `string` representation of the `Name` class when used in `String(instance)`.
   * @public
   * @template {PrefixValue | string} [CustomPrefix=PrefixValue] The custom prefix value, constrained by the `PrefixValue` and `string` type.
   * @template {NameValue | string} [CustomName=NameValue] The custom name value, constrained by the `NameValue` and `string` type.
   * @template {SuffixValue | string} [CustomSuffix=SuffixValue] The custom suffix value, constrained by the `SuffixValue` and `string` type.
   * @template {Delimiter | string} [CustomDelimiter=Delimiter] The custom delimiter value, constrained by the `Delimiter` and `string` type.
   * @param {NameOptions<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>} param0 
   * @param {NameOptions<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>} param0.delimiter The custom delimiter to use between the prefix, name, and suffix.
   * @param {NameOptions<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>} param0.name The custom name of generic type variable `Name`.
   * @param {NameOptions<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>} param0.prefix The custom prefix for the new name.
   * @param {NameOptions<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>} param0.suffix The custom suffix for the new name.
   * @returns {AdfixedName<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>} The composed name with the custom prefix, name, suffix, and delimiter on `AdfixedName`.
   */
  public compose<
    CustomPrefix extends PrefixValue | string = PrefixValue,
    CustomName extends NameValue | string = NameValue,
    CustomSuffix extends SuffixValue | string = SuffixValue,
    CustomDelimiter extends Delimiter | string = Delimiter
  >(
    { delimiter, name, prefix, suffix }: NameOptions<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter>
  ): AdfixedName<CustomPrefix, CustomName, CustomSuffix, CustomDelimiter> {
    return NameCore.compose({
      delimiter: delimiter ?? this.#delimiter as CustomDelimiter,
      name: name ?? this.#name as CustomName,
      prefix: prefix ?? this.#prefix.value as CustomPrefix,
      suffix: suffix ?? this.#suffix.value as CustomSuffix
    }, super.pattern);
  }

  /**
   * @description Sets the delimiter for the name.
   * @public
   * @param {Delimiter} value The value of generic type variable `Delimiter` constrained by the `string` type.
   * @returns {NameCore<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  public setDelimiter(value: Delimiter): NameCore<PrefixValue, NameValue, SuffixValue, Delimiter> {
    this.#delimiter = value;
    this.updateValue();
    return this;
  }

  /**
   * @description Sets the `name` between the `prefix`, and `suffix`.
   * @public
   * @param {NameValue} name The name of generic type variable `Name`.
   * @returns {NameCore<PrefixValue, NameValue, SuffixValue, Delimiter>} The `this` instance of `Name`.
   */
  public setName(name: NameValue): NameCore<PrefixValue, NameValue, SuffixValue, Delimiter> {
    (this.#name = NameCore.sanitize(name, super.pattern));
    this.updateValue();
    return this;
  }

  /**
   * @description Sets the `prefix` for the name with the `pattern` to sanitize.
   * @public
   * @param {PrefixValue} value The prefix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [pattern] Optional pattern to sanitize prefix.
   * @returns {NameCore<PrefixValue, NameValue, SuffixValue, Delimiter>} The `this` instance of `NameCore` child class.
   */
  public setPrefix(
    value: PrefixValue,
    pattern?: RegExp
  ): NameCore<PrefixValue, NameValue, SuffixValue, Delimiter> {
    this.#prefix.set(value, pattern);
    this.updateValue();
    return this;
  }

  /**
   * @description Sets the `suffix` for the name with the `pattern` to sanitize.
   * @public
   * @param {SuffixValue} value The suffix of generic type variable `PrefixValue` constrained by the `string` type.
   * @param {?RegExp} [pattern] Optional pattern to sanitize suffix.
   * @returns {NameCore<PrefixValue, NameValue, SuffixValue, Delimiter>} The `this` instance of `NameCore` child class.
   */
  public setSuffix(
    value: SuffixValue,
    pattern?: RegExp
  ): NameCore<PrefixValue, NameValue, SuffixValue, Delimiter> {
    this.#suffix.set(value, pattern);
    this.updateValue();
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
   * @description Updates the composed value.
   * @private
   */
  private updateValue(): void {
    this.#value = this.#compose();
  }

  /**
   * @description Returns composed name from the `prefix`, `name`, `delimiter` and `suffix` and assign it to the `#value`.
   * @returns {AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  #compose(): AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return NameCore.compose({
      delimiter: this.#delimiter,
      name: this.#name,
      prefix: this.#prefix.value,
      suffix: this.#suffix.value
    });
  }
}
