/**
 * @description A class to manage affixes (prefixes or suffixes) that can be applied to strings.
 * @export
 * @abstract
 * @class Affix
 * @template {string} [Value=string] The type of affix constrained by the `string`. Defaults to, `string`.
 */
export abstract class Affix<Value extends string = string> {
  /**
   * @description Defines the affix sanitized by specified filter.
   * @public
   * @static
   * @param {string} value An affix of generic type variable `Value` constrained by the `string` type to be sanitized with the `filter`.
   * @param {RegExp} [filter=Affix.filter] The filter of `RegExp` to sanitize the `affix`. Defaults to static `Affix.filter`.
   * @returns {string} The returned value is a `string` type affix.
   */
  public static define<Value extends string = string>(
    value: Value,
    filter: RegExp = Affix.filter,
  ): Value {
    return value.replace(filter, '') as Value;
  }

  /**
   * @description The default filter pattern used to sanitize the affix, which removes characters that are not part of the valid characters for the affix.
   * @public
   * @static
   * @type {RegExp}
   */
  public static filter: RegExp = /[^a-zA-Z0-9$_]/g;

  /**
   * @description Returns the privately stored filter of `RegExp` type to sanitize the affix.
   * @public
   * @readonly
   * @type {RegExp}
   */
  public get filter(): RegExp {
    return this.#filter;
  }

  /**
   * @description Returns the privately stored affix of `Value` type.
   * @public
   * @readonly
   * @type {Value}
   */
  public get value(): Value {
    return this.#value;
  }

  /**
   * @description Privately stored filter of `RegExp` to sanitize the affix.
   * @type {RegExp}
   */
  #filter = Affix.filter;

    /**
   * @description Privately stored affix of generic type variable `Value`.
   * @type {Value}
   */
  #value: Value = '' as Value;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {?Value} [value] An optional initial affix of generic type variable `Value` constrained by `string` type.
   * @param {?RegExp} [filter] The filter of `RegExp` to sanitize the affix.
   */
  constructor(value?: Value, filter?: RegExp) {
    filter instanceof RegExp && (this.#filter = filter);
    typeof value === 'string' && this.set(value);
  }

  /**
   * @description Returns the affix, optionally sanitized by the `filter`.
   * @public
   * @param {?RegExp} [filter] The filter of `RegExp` to sanitize privately stored affix.
   * @returns {string} Returns privately stored `#affix` of `string` type optionally sanitized by the `filter`.
   */
  public get(filter?: RegExp) {
    return Affix.define(this.#value, filter);
  }

  /**
   * @description Sets and stores privately sanitized affix of generic type variable `Value` constrained by `string` type.
   * @public
   * @param {Value} value The `affix` of generic type variable `Value`.
   * @param {RegExp} [filter=this.#filter] The filter of `RegExp` to sanitize the `affix`. Defaults to privately stored `#filter`.
   * @returns {this} The returned value is current instance for method chaining.
   */
  public set(value: Value, filter: RegExp = this.#filter): this {
    typeof value === 'string' && (this.#value = Affix.define(value, filter) as Value);
    return this;
  }

  /**
   * @description Sets the filter to sanitize the affix.
   * @public
   * @param {RegExp} filter The filter of `RegExp` to sanitize the affix.
   */
  public setFilter(filter: RegExp): this {
    filter instanceof RegExp && (this.#filter = filter);
    return this;
  }
}
