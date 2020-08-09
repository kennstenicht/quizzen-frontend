import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

interface Args {
  record: any
}

export default class FormFieldHasManyRecordComponent extends Component<Args> {
  // Defaults
  @tracked showForm = false;


  // Getter and setter
  get changeset() {
    return Changeset(
      this.args.record,
      lookupValidator(this.args.record.validations),
      this.args.record.validations
    );
  }


  // actions
  @action
  toggleForm() {
    this.showForm = !this.showForm;
  }
}
