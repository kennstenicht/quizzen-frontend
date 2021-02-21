import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { translate } from 'quizzen/utils/intl';
import { BufferedChangeset } from 'ember-changeset/types';
import Intl from 'ember-intl/services/intl';

interface Args {
  changeset: BufferedChangeset
  hint: string
  label: string
  modelName: string
  placeholder: string
  property: string
  type: string
}

export default class UiFormFieldComponent extends Component<Args> {
  // Services
  @service intl!: Intl;


  // Getter and setter
  get errors() {
    return this.args.changeset.error[this.args.property];
  }

  get fieldId() {
    const { modelName, property, changeset } = this.args;

    return `${modelName}-${changeset.id}-${property}`;
  }

  get isCheckbox() {
    return this.args.type === 'checkbox';
  }

  get isRelation() {
    return this.args.type === 'relation';
  }

  get isTextarea() {
    return this.args.type === 'textarea';
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
      `forms.${modelName}.placeholders.${property}`,
      `forms.defaults.placeholders.${property}`
    ];
    return translate.call(this, placeholder, lookups, { silent: true });
  }

  get hint() {
    const { modelName, hint, property } = this.args;
    const lookups = [
      `forms.${modelName}.hints.${property}`,
      `forms.defaults.hints.${property}`
    ];
    return translate.call(this, hint, lookups, { silent: true });
  }

  get type() {
    return this.args.type || 'text';
  }

  get isDirty() {
    return this.args.changeset.changes.findBy('key', this.args.property);
  }


  // Actions
  @action
  updateField(
    event: Event
  ) {
    const target = event.target as HTMLInputElement;

    this.args.changeset.set(this.args.property, target.value);
  }

  @action
  updateCheckbox(
    event: Event
  ) {
    const target = event.target as HTMLInputElement;

    this.args.changeset.set(this.args.property, target.checked);
  }

  @action
  rollbackProperty() {
    this.args.changeset.rollbackProperty(this.args.property);
  }
}
