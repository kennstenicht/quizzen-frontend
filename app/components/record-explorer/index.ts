import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Router from '@ember/routing/router-service';
import Model from '@ember-data/model';
import { pluralize } from 'ember-inflector';
import Intl from 'ember-intl/services/intl';

interface Args {
  records: Model[],
  modelName: string
}

export default class RecordDetailComponent extends Component<Args> {
  // Services
  @service intl!: Intl;
  @service router!: Router;


  // Getter and setter
  get headline() {
    return this.intl.t(`models.plurals.${this.args.modelName}`);
  }

  get newPath() {
    return `profile.${pluralize(this.args.modelName)}.new`;
  }


  // Actions
  @action
  openRecord(record: Model) {
    // @ts-ignore
    let modelName = record.constructor.modelName;
    let editRoute = `profile.${pluralize(modelName)}.${modelName}`;

    this.router.transitionTo(editRoute, record);
  }
}
