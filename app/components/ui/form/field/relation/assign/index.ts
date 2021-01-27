import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import { action } from '@ember/object';
import Model from '@ember-data/model';
import { A } from '@ember/array';

interface Args {
  modelName: string
  multiple: boolean
  onAssign: Function
  onClose: Function
  selectedRecords: Model[]
}

export default class UiFormFieldRelationAssignComponent extends Component<Args> {
  // Services
  @service store!: Store;


  // Defaults
  selectedRecords: Model[] = A([]);


  // Getter and setter
  get fetchRecords() {
    return this.store.findAll(this.args.modelName);
  }

  // Actions
  @action
  selectRecord(record: Model, disabled: boolean) {
    if (disabled) {
      return
    }

    if (this.selectedRecords.includes(record)) {
      this.selectedRecords.removeObject(record);
    } else {
      this.selectedRecords.pushObject(record);
    }
  }
}
