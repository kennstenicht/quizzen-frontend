import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

interface Args {
  groupName?: string;
}

export default class UiAccordion extends Component<Args> {
  // Getter and setter
  get groupName() {
    return this.args.groupName ?? guidFor(this);
  }
}
