import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Model from '@ember-data/model';

interface Args {
  record: Model
  openRecord: Function
  removeRecord: Function
  sortable: boolean
  groupName: string
}

export default class FormFieldRelationRecordComponent extends Component<Args> {
  // Defaults
  @tracked isDragging = false;


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
