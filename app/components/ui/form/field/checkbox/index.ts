import Component from '@glimmer/component';
import { action } from '@ember/object';
import { BufferedChangeset } from 'ember-changeset/types';

interface Args {
  changeset: BufferedChangeset,
  property: string,
}

export default class UiFormFieldCheckboxComponent extends Component<Args> {
  // Actions
  @action
  updateCheckbox(event: Event) {
    const target = event.target as HTMLInputElement;

    this.args.changeset.set(this.args.property, target.checked);
  }
}
