import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Accordion from 'quizzen/services/accordion';

interface Args {
  isOpen?: boolean,
  id: string,
  groupName: string,
}

export default class UiAccordionItem extends Component<Args> {
  // Services
  @service accordion!: Accordion;


  // Getter, setter and computed properties
  get itemId() {
    const id = this.args.id ?? guidFor(this);

    return `${this.args.groupName}-${id}`;
  }

  get isOpen() {
    return this.accordion.isOpenFor(this.itemId);
  }

  get toggleId() {
    return this.accordion.toggleIdFor(this.itemId);
  }

  get bodyId() {
    return this.accordion.bodyIdFor(this.itemId);
  }
}
