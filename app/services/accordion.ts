import Service from '@ember/service';
import { action } from '@ember/object';
//@ts-ignore
import { TrackedMap } from 'tracked-built-ins';

export default class Accordion extends Service {
  // Defaults
  accordions: TrackedMap = new TrackedMap(new Map());


  // Actions
  @action
  toggleItem(id: string) {
    this.accordions.set(id, !this.accordions.get(id));
  }


  // Functions
  isOpenFor(id: string) {
    return this.accordions.get(id);
  }

  toggleIdFor(id: string) {
    return `accordion-toggle-${id}`;
  }

  bodyIdFor(id: string) {
    return `accordion-body-${id}`;
  }
}
