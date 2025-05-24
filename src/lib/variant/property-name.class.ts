import { Name } from '../name.class';

export class PropertyName<
  PrefixValue extends string = '',
  NameValue extends string = string,
  SuffixValue extends string = '',
  Delimiter extends string = ''
> extends Name<PrefixValue, NameValue, SuffixValue, Delimiter> {
  constructor(
    name?: NameValue,
    {prefix, suffix}: {prefix?: PrefixValue, suffix?: SuffixValue} = {},
    delimiter?: Delimiter
  ) {
    super(name || '' as NameValue, {prefix, suffix}, delimiter, /[^a-zA-Z$_]/g);
  }
}
