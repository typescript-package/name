import { Name } from './name.class';

export class PropertyName<
  Prefix extends string = '',
  NameValue extends string = string,
  Suffix extends string = '',
  Delimiter extends string = ''
> extends Name<Prefix, NameValue, Suffix, Delimiter> {
  constructor(
    name?: NameValue,
    {prefix, suffix}: {prefix?: Prefix, suffix?: Suffix} = {},
    delimiter?: Delimiter
  ) {
    super(name || '' as NameValue, {prefix, suffix}, delimiter, /[^a-zA-Z$_]/g);
  }
}
