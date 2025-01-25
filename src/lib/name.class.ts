// Class.
import { CommonName } from './common-name.class';
import { Wrap } from '@typescript-package/wrapper';
/**
 * @description
 * @export
 * @class Name
 * @template {string} [Prefix=''] 
 * @template {string} [Name=string] 
 * @template {string} [Suffix=''] 
 * @extends {CommonName}
 */
export class Name<
  Prefix extends string = '',
  Name extends string = string,
  Suffix extends string = '',
> extends CommonName {
  /**
   * @description Returns privately stored name.
   * @public
   * @readonly
   * @type {Name}
   */
  public get get() {
    return this.#name;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {Prefix}
   */
  public override get prefix(): Prefix {
    return super.prefix as Prefix;
  }

  /**
   * @inheritdoc
   * @public
   * @readonly
   * @type {Suffix}
   */
  public override get suffix(): Suffix {
    return super.suffix as Suffix;
  }

  /**
   * @description Generates the name with prefix and suffix.
   * @public
   * @readonly
   * @type {`${Prefix}${Name}${Suffix}`}
   */
  public get generate(): `${Prefix}${Name}${Suffix}` {
    return new Wrap(this.prefix, this.suffix, this.#name).valueOf();
  }

  /**
   * @description
   * @type {Name}
   */
  #name;

  /**
   * Creates an instance of `Name`.
   * @constructor
   * @param {Name} name 
   * @param {{ prefix?: Prefix, suffix?: Suffix }} [param0={}] 
   * @param {Prefix} param0.prefix 
   * @param {Suffix} param0.suffix 
   */
  constructor(
    name: Name,
    { prefix, suffix }: { prefix?: Prefix, suffix?: Suffix } = {}
  ) {
    super({ prefix, suffix });
    this.#name = name;
  }

  /**
   * @description Set the name.
   * @public
   * @param {string} name A `string` type value.
   * @returns {this} 
   */
  public set<CustomName extends string = string>(name: Name | CustomName): this {
    typeof name === 'string' && (this.#name = name as any);
    return this;
  }
}
