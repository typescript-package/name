// Class.
import { Name } from "./name.class";
/**
 * @description
 * @export
 * @class FileName
 * @template {string} [Ext=string] 
 * @template {string} [Name=string] 
 * @extends {Name<'', Name, `.${Ext}`>}
 */
export class FileName<
  Ext extends string = string,
  Name extends string = string
> extends Name<'', Name, `.${Ext}`> {
  constructor(name: Name, ext: Ext) {
    super(name, { prefix: '', suffix: `.${ext}` });
  }
}
