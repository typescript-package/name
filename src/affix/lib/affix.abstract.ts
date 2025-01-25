/**
 * @description
 * @export
 * @abstract
 * @class Affix
 */
export abstract class Affix {
  /**
   * @description Define affix for the name.
   * @public
   * @static
   * @param {string} value A `string` type value.
   * @param {RegExp} [filter=Affix.filter] 
   * @returns {string} The return value is a `string` type affix.
   */
  public static define(
    value: string,
    filter: RegExp = Affix.filter,
  ): string {
    return value.replace(filter, '');
  }

  /**
   * @description
   * @public
   * @static
   * @type {{}}
   */
  public static filter = /[^a-zA-Z0-9$_]/g;

  /**
   * @description Returns privately stored affix.
   * @public
   * @readonly
   * @type {string}
   */
  public get get(): string {
    return this.#affix;
  }

  /**
   * @description
   * @type {{}}
   */
  #filter = Affix.filter;

  /**
   * @description Initialize default affix.
   * @type {string}
   */
  #affix = '';

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {?string} [affix] An optional initial `string` type value as affix.
   * @param {?RegExp} [filter] The filter of `RegExp` for affix.
   */
  constructor(affix?: string, filter?: RegExp) {
    typeof affix === 'string' && this.set(affix);
    typeof filter === 'string' && (this.#filter = filter);
  }
  
  /**
   * @description Sets and stores privately affix of a string type for the name.
   * @public
   * @param {string} affix A `string` type value.
   * @returns {this}
   */
  public set(affix: string): this {
    typeof affix === 'string' && (this.#affix = Affix.define(affix, this.#filter));
    return this;
  }
}
