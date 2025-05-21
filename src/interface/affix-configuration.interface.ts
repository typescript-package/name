export interface AffixConfiguration<Value extends string = string> {
  value: Value;
  pattern: RegExp;
};
