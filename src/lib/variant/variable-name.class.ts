// Class.
import { Name } from "./name.class";
/**
 * @description
 * @export
 * @class VariableName
 * @template {string} [NameValue=string] 
 * @extends {NameValue<'$', NameValue, ''>}
 */
export class VariableName<
  NameValue extends string = string,
  PrefixValue extends string = '',
  SuffixValue extends string = '',
  Delimiter extends string = ''
> extends Name<`$${PrefixValue}`, NameValue, SuffixValue, Delimiter> {
  constructor(
    name: NameValue,
    { prefix, suffix }: {
      prefix?: PrefixValue,
      suffix?: SuffixValue
    } = {},
    delimiter: Delimiter = VariableName.delimiter as Delimiter,
    pattern: RegExp = VariableName.pattern as RegExp,
  ) {
    super(name, { prefix: `$${prefix || ''}` as any, suffix }, delimiter, pattern);
  }
}
