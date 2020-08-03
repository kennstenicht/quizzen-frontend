import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormFieldHasManyComponent extends Component {
  @service store;

  @action
  addRecord() {
    let newRecord = this.store.createRecord('answer', {
      label: 'test'
    });

    this.args.records.pushObject(newRecord);
  }
}
