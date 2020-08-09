import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Args {
  records: any[]
}

export default class FormFieldHasManyComponent extends Component<Args> {
  @service store!: Store;

  @action
  addRecord() {
    let newRecord = this.store.createRecord('answer', {
      label: 'test'
    });

    this.args.records.pushObject(newRecord);
  }
}
