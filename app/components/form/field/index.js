import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { translate } from 'quizzen/utils/intl';

export default class FormFieldComponent extends Component {
  // Services
  @service intl;


  // Getter and setter
  get errors() {
    return this.args.changeset.error[this.args.property];
  }

  get fieldId() {
    const { modelName, property, changeset } = this.args;

    return `${modelName}-${changeset.id}-${property}`;
  }

  get isHasMany() {
    return this.args.type === 'has-many';
  }

  get label() {
    const { label, modelName, property } = this.args;
    const lookups = [
      `forms.${modelName}.fields.${property}`,
      `forms.defaults.fields.${property}`
    ];

    return translate.call(this, label, lookups);
  }

  get placeholder() {
    const { modelName, placeholder, property } = this.args;
    const lookups = [
      `forms.${modelName}.placeholder.${property}`,
      `forms.defaults.placeholder.${property}`
    ];
    return translate.call(this, placeholder, lookups, { silent: true });
  }

  get type() {
    return this.args.type || 'text';
  }

  get value() {
    return this.args.changeset[this.args.property];
  }


  // Actions
  @action
  updateChangeset(e) {
    this.args.changeset[this.args.property] = e.target.value;
  }
}
