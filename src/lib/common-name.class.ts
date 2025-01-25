// Class.
import { Prefix } from '../affix/lib/prefix.class';
import { Suffix } from '../affix/lib/suffix.class';
/**
 * @description
 * @export
 * @abstract
 * @class CommonName
 */
export abstract class CommonName {
  /**
   * @description
   * @public
   * @readonly
   * @type {string}
   */
  public get prefix() {
    return this.#prefix.get;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {string}
   */
  public get suffix() {
    return this.#suffix.get;
  }

  /**
   * @description Private namespace for prefix.
   * @type {Prefix}
   */
  #prefix: Prefix = new Prefix();
  
  /**
   * @description Private namespace for suffix.
   * @type {Suffix}
   */
  #suffix: Suffix = new Suffix();

  /**
   * Creates an instance of child class.
   * @constructor
   * @param {{ prefix?: string, suffix?: string }} [param0={}] 
   * @param {string} param0.prefix 
   * @param {string} param0.suffix 
   */
  constructor({ prefix, suffix }: { prefix?: string, suffix?: string } = {}) {
    typeof prefix === 'string' && this.setPrefix(prefix);
    typeof suffix === 'string' && this.setSuffix(suffix);
  }
  
  /**
   * @description Set prefix for the name.
   * @public
   * @param {string} prefix A `string` type value as prefix.
   * @returns {this} 
   */
  public setPrefix(prefix: string): this {
    this.#prefix.set(prefix);
    return this;
  }

  /**
   * @description Sets suffix for the name.
   * @public
   * @param {string} suffix A `string` type value as suffix.
   * @returns {this} 
   */
  public setSuffix(suffix: string): this {
    this.#suffix.set(suffix);
    return this;
  }
}
