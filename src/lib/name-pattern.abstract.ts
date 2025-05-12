
export abstract class NamePattern {
  //#region static.
  /**
   * @description Sanitizes the name with a `pattern`, by default `this.pattern`.
   * @public
   * @static
   * @template {string} [Value=string] 
   * @param {Value} value 
   * @param {RegExp} [pattern=Name.pattern] 
   * @returns {Value} 
   */
  public static sanitize<Value extends string = string>(
    value: Value,
    pattern: RegExp = this.pattern
  ): Value {
    return value.replace(pattern, '') as Value;
  }

  /**
   * @description The default pattern used to sanitize the name, which removes characters that are not part of the valid characters for the name.
   * @public
   * @static
   * @type {RegExp}
   */
  public static pattern: RegExp = /[^a-zA-Z0-9$_]/g;
  //#endregion static

  //#region instance
  /**
   * @description Returns the `string` tag representation of the `NamePattern` class when used in `Object.prototype.toString.call(instance)`.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag]() {
    return NamePattern.name;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {string}
   */
  public get pattern() {
    return this.#pattern;
  }

  /**
   * @description Privately stored pattern of `RegExp` to sanitize the name.
   * @type {?RegExp}
   */
  #pattern?: RegExp;

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {RegExp} [pattern=NamePattern.pattern] 
   */  
  constructor(pattern: RegExp = NamePattern.pattern) {
    pattern instanceof RegExp && this.setPattern(pattern);
  }

  /**
   * @description Sets the pattern to sanitize the name.
   * @public
   * @param {RegExp} pattern The pattern of `RegExp` to sanitize the name.
   * @returns {this} 
   */
  public setPattern(pattern: RegExp): this {
    pattern instanceof RegExp && (this.#pattern = pattern);
    return this;
  }
  //#endregion instance
}
