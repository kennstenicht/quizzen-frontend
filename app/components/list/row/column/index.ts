import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { lookupTranslation } from 'quizzen/utils/intl';
import Intl from 'ember-intl/services/intl';

interface Args {
  modelName: string,
  column: string,
  record: any,
}

export default class ListRowColumnComponent extends Component<Args> {
  // Services
  @service intl!: Intl;


  // Getter and setter
  get columnName() {
    const { modelName, column } = this.args;

    const lookups = [
      `tables.${modelName}.fields.${column}`,
      `tables.defaults.fields.${column}`,
      `forms.${modelName}.fields.${column}`,
      `forms.defaults.fields.${column}`
    ];

    return lookupTranslation.call(this, lookups);
  }
}
