import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';

interface Args {
  changeset: BufferedChangeset,
  formActions?: {
    submit?: Function,
    reset?: Function,
  }
}

export default class UiFormComponent extends Component<Args> {
  // Getter and setter
  get modelName(): string {
    // @ts-ignore
    return this.args.changeset.data.constructor.modelName;
  }
}
