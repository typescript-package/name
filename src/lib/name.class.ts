// Class.
import { NameCore } from './name-core.abstract';
// Type.
import { AdfixedName } from '@typedly/name';
// Interface.
import { NameAdfix } from '@typedly/name';
/**
 * @description The class `Name` is a generic class that represents a name with optional prefix and suffix.
 * @export
 * @class Name
 * @template {string} [PrefixValue=''] The type of `prefix` constrained by `string`. Defaults to empty.
 * @template {string} [NameValue=string] The type of `name` constrained by `string`. Defaults to, `string`.
 * @template {string} [SuffixValue=''] The type of `suffix` constrained by `string`. Defaults to empty.
 * @template {string} [Delimiter=''] The type of `delimiter` constrained by `string`. Defaults to empty.
 * @extends {NameCore<PrefixValue, NameValue, SuffixValue, Delimiter>}
 */
export class Name<
  PrefixValue extends string = '',
  NameValue extends string = string,
  SuffixValue extends string = '',
  Delimiter extends string = ''
> extends NameCore<PrefixValue, NameValue, SuffixValue, Delimiter> {
  //#region static.
  /**
   * @description Creates a new instance of the `Name` class.
   * @public
   * @static
   * @template {string} [PrefixValue=''] The type of `prefix` constrained by `string`. Defaults to empty.
   * @template {string} [NameValue=string] The type of `name` constrained by `string`. Defaults to, `string`.
   * @template {string} [SuffixValue=''] The type of `suffix` constrained by `string`. Defaults to empty.
   * @template {string} [Delimiter=''] The type of `delimiter` constrained by `string`. Defaults to empty.
   * @param {NameValue} [name='' as NameValue] The name of generic type variable `NameValue` to define name.
   * @param {NameAdfix<PrefixValue, SuffixValue>} [param0={}] The adfixes to apply to the name.
   * @param {NameAdfix<PrefixValue, SuffixValue>} param0.prefix The prefix to apply to the name.
   * @param {NameAdfix<PrefixValue, SuffixValue>} param0.suffix The suffix to apply to the name.
   * @param {?Delimiter} [delimiter] The delimiter to use between the prefix, name, and suffix.
   * @param {?RegExp} [pattern] The pattern to use for sanitizing the name.
   * @returns {Name<PrefixValue, NameValue, SuffixValue, Delimiter>} 
   */
  public static create<
    PrefixValue extends string = '',
    NameValue extends string = string,
    SuffixValue extends string = '',
    Delimiter extends string = ''
  >(
    name: NameValue = '' as NameValue,
    { prefix, suffix }: NameAdfix<PrefixValue, SuffixValue> = {},
    delimiter?: Delimiter,
    pattern?: RegExp
  ): Name<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return new Name(
      name, 
      {
        prefix: prefix ?? Name.prefix as PrefixValue,
        suffix: suffix ?? Name.suffix as SuffixValue,
      },
      delimiter,
      pattern
    );
  }

  /**
   * @description Defines the full name built from the `prefix`, `name` and `suffix`.
   * @public
   * @static
   * @template {string} [PrefixValue=''] The type of `prefix` constrained by `string`. Defaults to empty.
   * @template {string} [NameValue=string] The type of `name` constrained by `string`. Defaults to, `string`.
   * @template {string} [SuffixValue=''] The type of `suffix` constrained by `string`. Defaults to empty.
   * @param {PrefixValue} prefix The prefix of generic type variable `Prefix` to define name.
   * @param {NameValue} name The name of generic type variable `Name` to define name.
   * @param {SuffixValue} suffix The suffix of generic type variable `Suffix` to define name.
   * @param {boolean} [sanitize=true] The boolean value to sanitize the name.
   * @param {Delimiter} [delimiter] The delimiter to use between the prefix, name, and suffix.
   * @returns {AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter>} The returned value is name of template type.
   */
  public static define<
    PrefixValue extends string = '',
    NameValue extends string = string,
    SuffixValue extends string = '',
    Delimiter extends string = ''
  >(
    prefix: PrefixValue,
    name: NameValue,
    suffix: SuffixValue,
    delimiter: Delimiter = Name.delimiter as Delimiter,
    sanitize = true
  ): AdfixedName<PrefixValue, NameValue, SuffixValue, Delimiter> {
    return new Name(
      name,
      {prefix, suffix},
      delimiter,
      sanitize ? Name.pattern : undefined
    ).value;
  }

  //#region instance.
  /**
   * @description Returns the `string` tag representation of the `Name` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public override get [Symbol.toStringTag]() {
    return Name.name;
  }
  //#endregion instance

  /**
   * Creates an instance of `Name`. 
   * @constructor
   * @param {NameValue} [name] The name of generic type variable `Name`.
   * @param {NameAdfix<PrefixValue, SuffixValue>} param0 
   * @param {NameAdfix<PrefixValue, SuffixValue>} param0.prefix The default value for the instance of `Prefix`.
   * @param {NameAdfix<PrefixValue, SuffixValue>} param0.suffix The default value for the instance of `Suffix`.
   * @param {?Delimiter} [delimiter] The delimiter to use between the prefix, name, and suffix.
   * @param {?RegExp} [pattern] The pattern to use for sanitizing the name.
   */
  constructor(
    name: NameValue,
    { prefix, suffix }: NameAdfix<PrefixValue, SuffixValue>,
    delimiter?: Delimiter,
    pattern?: RegExp
  ) {
    super(name, { prefix, suffix }, delimiter, pattern);
  }

  /**
   * @description Returns the new instance of `Name`, built from the `prefix`, `name`, and `suffix`.
   * @public
   * @template {string} [WithPrefix=PrefixValue] The type of `prefix` constrained by `string`. Defaults to empty.
   * @template {string} [WithName=string] The type of `name` constrained by `string`. Defaults to, `string`.
   * @template {string} [WithSuffix=SuffixValue] The type of `suffix` constrained by `string`. Defaults to empty.
   * @template {string} [WithDelimiter=Delimiter] 
   * @param {WithName} name The name of generic type variable `WithName` to define name.
   * @param {NameAdfix<WithPrefix, WithSuffix>} [param0={}] The affixes for the new name.
   * @param {NameAdfix<WithPrefix, WithSuffix>} param0.prefix The prefix for the new name.
   * @param {NameAdfix<WithPrefix, WithSuffix>} param0.suffix The suffix for the new name.
   * @param {?WithDelimiter} [delimiter] The delimiter to use between the prefix, name, and suffix.
   * @returns {Name<WithPrefix, WithName, WithSuffix, WithDelimiter>} 
   */
  public with<
    WithPrefix extends string = PrefixValue,
    WithName extends string = string,
    WithSuffix extends string = SuffixValue,
    WithDelimiter extends string = Delimiter
  >(
    name: WithName,
    { prefix, suffix }: NameAdfix<WithPrefix, WithSuffix> = {},
    delimiter?: WithDelimiter
  ): Name<WithPrefix, WithName, WithSuffix, WithDelimiter> {
    return new Name(
      name,
      {
        prefix: (prefix ?? super.prefix.value) as WithPrefix,
        suffix: (suffix ?? super.suffix.value) as WithSuffix
      },
      delimiter,
      super.pattern
    );
  }
}
