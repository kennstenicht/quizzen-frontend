// Types for compiled templates
declare module 'quizzen/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

declare module "tracked-built-ins" {
  interface TrackedArray<T> extends Array<T> {}

  export const TrackedArray: new <T>(array?: T[]) => TrackedArray<T>
}
