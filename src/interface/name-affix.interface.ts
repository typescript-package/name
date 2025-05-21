// Type.
import { AffixOptions } from ".";
/**
 * @description Defines the name affix type.
 * @export
 * @template {string} PrefixValue The type of `prefix` constrained by `string`.
 * @template {string} SuffixValue The type of `suffix` constrained by `string`.
 */
export interface NameAffix<
  PrefixValue extends string,
  SuffixValue extends string
> {
  prefix?: PrefixValue | AffixOptions<PrefixValue>;
  suffix?: SuffixValue | AffixOptions<SuffixValue>;
};
