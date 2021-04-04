import Component from '@glimmer/component';
import { action } from '@ember/object';
import { BufferedChangeset } from 'ember-changeset/types';

interface Args {
  changeset: BufferedChangeset,
  property: string,
}

export default class UiFormFieldTextareaComponent extends Component<Args> {
  // Actions
  @action
  updateTextarea(event: Event) {
    const target = event.target as HTMLInputElement;

    this.args.changeset.set(this.args.property, target.value);
  }
}
