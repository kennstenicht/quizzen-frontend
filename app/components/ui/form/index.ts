import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';
import Model from 'quizzen/models/base';

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
    let model = this.args.changeset.data as Model;

    return model.modelName;
  }
}
