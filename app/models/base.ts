import Model, { attr } from '@ember-data/model';
import { inject as service } from '@ember/service';
import Intl from 'ember-intl/services/intl';

export default class BaseModel extends Model {
  // Services
  @service intl!: Intl;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Getter and setter
  get modelName(): string {
    // @ts-ignore
    return this.constructor.modelName;
  }

  get displayLabel() {
    return this.intl.t(`model.${this.modelName}`)
  }
}
