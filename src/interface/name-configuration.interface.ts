import { NameAffix } from '../interface';

export interface NameConfiguration<
  PrefixValue extends string = string,
  NameValue extends string = string,
  SuffixValue extends string = string,
  Delimiter extends string = string
> {
  prefix: Pick<NameAffix<PrefixValue, SuffixValue>, 'prefix'>,
  suffix: Pick<NameAffix<PrefixValue, SuffixValue>, 'suffix'>,
  delimiter: Delimiter,
  name: NameValue,
  pattern: RegExp | undefined
}
