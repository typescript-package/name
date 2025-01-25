// Classes.
import { Prefix } from '../affix/lib/prefix.class';
import { Suffix } from '../affix/lib/suffix.class';

export abstract class CommonName {

  public get prefix() {
    return this.#prefix.get;
  }

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

  constructor({ prefix, suffix }: { prefix?: string, suffix?: string } = {}) {
    typeof prefix === 'string' && this.setPrefix(prefix);
    typeof suffix === 'string' && this.setSuffix(suffix);
  }

  /**
   * Set prefix for the name.
   * @param prefix A `string` type value as prefix.
   * @param callback A `ResultCallback` function to handle the result of the check if the prefix is a `string`.
   * @returns this.
   */
  public setPrefix(prefix: string): this {
    this.#prefix.set(prefix);
    return this;
  }

  /**
   * Set suffix for the name.
   * @param suffix A `string` type value as suffix.
   * @param callback A `ResultCallback` function to handle the result of the check if the suffix is a `string`.
   * @returns this.
   */
  public setSuffix(suffix: string): this {
    this.#suffix.set(suffix);
    return this;
  }
}
