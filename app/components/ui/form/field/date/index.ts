import Component from '@glimmer/component';
import { action } from '@ember/object';
import { BufferedChangeset } from 'ember-changeset/types';

interface Args {
  changeset: BufferedChangeset,
  property: string,
}

export default class UiFormFieldDateComponent extends Component<Args> {
  get date() {
    return new Date(this.args.changeset.get(this.args.property))
      .toISOString()
      .substring(0, 10);
  }


  // Actions
  @action
  updateDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const date = new Date(target.value);

    this.args.changeset.set(this.args.property, date);
  }
}
