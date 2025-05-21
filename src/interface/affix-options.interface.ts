// Interface.
import { AffixConfiguration } from "./affix-configuration.interface";
/**
 * @description
 * @export
 * @interface AffixOptions
 * @template {string} Value 
 */
export interface AffixOptions<Value extends string = string> extends Partial<AffixConfiguration<Value>> {}
