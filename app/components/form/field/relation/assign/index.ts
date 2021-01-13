import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Model from '@ember-data/model';

interface Args {
  modelName: string,
  multiple: boolean,
  onAssign: Function,
  onClose: Function
}

export default class FormFieldRelationAssignComponent extends Component<Args> {
  // Services
  @service store!: Store;

  @tracked selectedRecords: Model[] = [];

  // Getter and setter
  get fetchRecords() {
    return this.store.findAll(this.args.modelName);
  }

  @action
  selectRecord(record: Model) {
    this.selectedRecords.push(record);
  }
}
