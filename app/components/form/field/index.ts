import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { translate } from 'quizzen/utils/intl';
import { BufferedChangeset } from 'ember-changeset/types';
import Intl from 'ember-intl/services/intl';

interface Args {
  changeset: BufferedChangeset,
  label: string,
  modelName: string,
  property: string,
  placeholder: string,
  type: string,
}

export default class FormFieldComponent extends Component<Args> {
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


  // Actions
  @action
  updateField(
    event: Event
  ) {
    const target = event.target as HTMLInputElement;
    console.log(target.value);

    this.args.changeset.set(this.args.property, target.value);
  }
}
