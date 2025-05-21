import { NameConfiguration } from "./name-configuration.interface";

export interface NameOptions<
  PrefixValue extends string = string,
  NameValue extends string = string,
  SuffixValue extends string = string,
  Delimiter extends string = string
> extends Partial<NameConfiguration<PrefixValue, NameValue, SuffixValue, Delimiter>> {}
