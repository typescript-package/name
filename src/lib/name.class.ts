// Class.
import { Prefix, Suffix } from '../affix';
import { CommonName } from './common-name.class';
import { Wrap } from '@typescript-package/wrapper';
/**
 * @description
 * @export
 * @class Name
 * @template {string} [Prefix=''] 
 * @template {string} [Word=string] 
 * @template {string} [Suffix=''] 
 * @extends {CommonName}
 */
export class Name<
  Prefix extends string = '',
  Word extends string = string,
  Suffix extends string = '',
> extends CommonName<Prefix, Suffix> {
  //#region static.
  /**
   * @description Defines the name built from the `prefix`, `word` and `suffix`.
   * @public
   * @static
   * @template {string} [Prefix=''] The type of `prefix` constrained by `string`. Defaults to empty.
   * @template {string} [Word=string] The type of `word` constrained by `string`. Defaults to, `string`.
   * @template {string} [Suffix=''] The type of `suffix` constrained by `string`. Defaults to empty.
   * @param {Prefix} prefix The prefix of generic type variable `Prefix` to define name.
   * @param {Word} word The word of generic type variable `Word` to define name.
   * @param {Suffix} suffix The suffix of generic type variable `Suffix` to define name.
   * @returns {`${Prefix}${Word}${Suffix}`} The returned value is name of template type.
   */
  public static define<
    Prefix extends string = '',
    Word extends string = string,
    Suffix extends string = '',
  >(
    prefix: Prefix,
    word: Word,
    suffix: Suffix
  ): `${Prefix}${Word}${Suffix}` {
    return new Wrap(
      Prefix.sanitize(prefix) as Prefix,
      Suffix.sanitize(suffix) as Suffix,
      Name.sanitize(word) as Word
    ).valueOf();
  }

  /**
   * @description Sanitizes the name with a `filter`, by default `NAme.filter`.
   * @public
   * @param {string} value 
   * @param {RegExp} [filter=Name.filter] 
   * @returns {string} 
   */
  public static sanitize(value: string, filter: RegExp = Name.filter): string {
    return value.replace(filter, '');
  }

  /**
   * @description The default filter pattern used to sanitize the word, which removes characters that are not part of the valid characters for the word.
   * @public
   * @static
   * @type {RegExp}
   */
  public static filter: RegExp = /[^a-zA-Z0-9$_]/g;

  /**
   * @description The default value for the prefix instance.
   * @public
   * @static
   * @type {?string}
   */
  public static prefix?: string;

  /**
   * @description The default value for the suffix instance.
   * @public
   * @static
   * @type {?string}
   */
  public static suffix?: string;
  //#endregion static.

  //#region instance.
  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {Prefix}
   */
  public override get prefix() {
    return super.prefix;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {Suffix}
   */
  public override get suffix() {
    return super.suffix;
  }

  /**
   * @description Returns the name built from `prefix`, `word`, and `suffix`.
   * @public
   * @readonly
   * @type {`${Prefix}${Word}${Suffix}`}
   */
  public get value(): `${Prefix}${Word}${Suffix}` {
    return this.#value;
  }

  /**
   * @description Returns privately stored word between the `prefix`, and `suffix`.
   * @public
   * @readonly
   * @type {Word}
   */
  public get word() {
    return this.#word;
  }

  /**
   * @description Privately stored filter of `RegExp` to sanitize the word.
   * @type {RegExp}
   */
  #filter = Name.filter;

  /**
   * @description Privately stored name.
   * @type {`${Prefix}${Word}${Suffix}`}
   */
  #value!: `${Prefix}${Word}${Suffix}`;

  /**
   * @description Privately stored word of name.
   * @type {Word}
   */
  #word: Word = '' as Word;
  //#endregion instance
  
  /**
   * Creates an instance of `Name`.
   * @constructor
   * @param {Word} [word='' as Word] The required word for the name.
   * @param {{prefix?: Prefix, suffix?: Suffix}} [param0={}] 
   * @param {Prefix} param0.prefix Optional prefix of generic type variable `Prefix` type.
   * @param {Suffix} param0.suffix Optional suffix of generic type variable `Suffix` type.
   */
  constructor(
    word: Word = '' as Word,
    {prefix, suffix}: {prefix?: Prefix, suffix?: Suffix} = {}
  ) {
    super({ prefix, suffix });
    this.set(word, {prefix, suffix});
    this.update();
  }

  /**
   * @description
   * @public
   * @param {Word} word 
   * @param {{prefix?: Prefix, suffix?: Suffix  }} [param0={}] 
   * @param {Prefix} param0.prefix 
   * @param {Suffix} param0.suffix 
   * @returns {`${Prefix}${Word}${Suffix}`} 
   */
  public define(
    word: Word,
    {prefix, suffix}: {prefix?: Prefix, suffix?: Suffix  } = {}
  ): `${Prefix}${Word}${Suffix}` {
    return Name.define(
      prefix || '' as Prefix,
      word,
      suffix || '' as Suffix
    );
  }

  /**
   * @description Sets the name with prefix, word and suffix.
   * @public
   * @param {Word} word 
   * @param {{prefix?: Prefix, suffix?: Suffix  }} [param0={}] 
   * @param {Prefix} param0.prefix 
   * @param {Suffix} param0.suffix 
   * @returns {this} 
   */
  public set(
    word: Word,
    {prefix, suffix}: {prefix?: Prefix, suffix?: Suffix  } = {}
  ): this {
    this.setWord(word);
    typeof prefix !== 'undefined' && super.setPrefix(prefix);
    typeof suffix !== 'undefined' && super.setSuffix(suffix);
    return this;
  }

  /**
   * @description Sets the filter to sanitize the word.
   * @public
   * @param {RegExp} filter The filter of `RegExp` to sanitize the word.
   */
  public setFilter(filter: RegExp): this {
    filter instanceof RegExp && (this.#filter = filter);
    return this;
  }

  /**
   * @description Sets the word between the `prefix` and `suffix`.
   * @public
   * @param {Word} word The word of generic type variable `Word`.
   * @param {RegExp} [filter=this.#filter] The filter of `RegExp` to sanitize the `word`. Defaults to `this.#filter`.
   * @returns {this} 
   */
  public setWord(
    word: Word,
    filter: RegExp = this.#filter
  ): this {
    typeof word === 'string' && (this.#word = word.replace(filter, '') as Word);
    return this;
  }

  /**
   * @description Updates the name with a stored prefix, word, and suffix.
   * @public
   * @returns {this} 
   */
  public update(): this {
    this.#value = Name.define(
      super.prefix.value,
      this.#word,
      super.suffix.value
    );
    return this;
  }
}
