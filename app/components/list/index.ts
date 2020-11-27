import Component from '@glimmer/component';
import { pluralize } from 'ember-inflector';

interface Args {
  records: any,
  modelName: string
}

export default class ListComponent extends Component<Args> {
  // Getter and setter
  get editRoute() {
    let modelName = this.args.modelName;

    return `profile.${pluralize(modelName)}.${modelName}`;
  }
}
