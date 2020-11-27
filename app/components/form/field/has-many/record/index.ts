import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface Args {
  record: any
}

export default class FormFieldHasManyRecordComponent extends Component<Args> {
  // Defaults
  @tracked showForm = false;


  // actions
  @action
  toggleForm() {
    this.showForm = !this.showForm;
  }
}
