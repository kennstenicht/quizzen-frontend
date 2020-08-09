import Component from '@glimmer/component';
import { BufferedChangeset } from 'ember-changeset/types';
import Model from '@ember-data/model';

interface Args {
  changeset: BufferedChangeset
}

export default class FormComponent extends Component<Args> {
  get modelName() {
    let model = this.args.changeset.data as Model;
    // @ts-ignore
    return model.constructor.modelName;
  }
}
