// Class.
import { Name } from "../name.class";

export class ClassName<
  NameValue extends string = string,
  Project extends string =  '',
  Role extends string = '',
  Delimiter extends string = ''
> extends Name<Project, NameValue, Role, Delimiter> {
  /**
   * @description The default pattern for class names.
   * @public
   * @static
   * @type {RegExp}
   */
  public static override pattern: RegExp = /[^a-zA-Z0-9$_-]/g;

  /**
   * Creates an instance of `ClassName`.
   * @constructor
   * @param {?NameValue} [name] The name of the class.
   * @param {{
   *       project?: Project,
   *       role?: Role,
   *     }} [param0={}] The project and role of the class.
   * @param {Project} param0.project The project of the class.
   * @param {Role} param0.role The role of the class.
   * @param {Delimiter} [delimiter=ClassName.delimiter as Delimiter] The delimiter for the class name.
   * @param {RegExp} [pattern=ClassName.pattern] The pattern for the class name.
   */
  constructor(
    name?: NameValue,
    {project, role}: {
      project?: Project,
      role?: Role,
    } = {},
    delimiter: Delimiter = ClassName.delimiter as Delimiter,
    pattern: RegExp = ClassName.pattern
  ) {
    super(
      name || '' as NameValue,
      { prefix: project, suffix: role },
      delimiter,
      pattern
    );
  }
}
