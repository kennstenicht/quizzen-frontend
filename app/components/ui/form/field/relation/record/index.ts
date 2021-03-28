import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Model from '@ember-data/model';
import Accordion from 'quizzen/services/accordion';

interface Args {
  record: Model
  openRecord: Function
  removeRecord: Function
  sortable: boolean
  groupName: string
}

export default class UiFormFieldRelationRecordComponent extends Component<Args> {
  // Services
  @service accordion!: Accordion;


  // Defaults
  @tracked isDragging = false;


  // Getter, setter and computed properties
  get accodrionItemId() {
    return `${this.args.groupName}-${this.args.record.id}`;
  }

  get accodrionIsOpen() {
    return this.accordion.isOpenFor(this.accodrionItemId);
  }

  get accordionToggleId() {
    return this.accordion.toggleIdFor(this.accodrionItemId);
  }

  get accordionBodyId() {
    return this.accordion.bodyIdFor(this.accodrionItemId);
  }


  //Actions
  @action
  dragStarted() {
    this.isDragging = true;
  }

  @action
  dragStopped() {
    this.isDragging = false;
  }
}
