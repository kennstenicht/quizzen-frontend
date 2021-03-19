import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Router from '@ember/routing/router-service';
import { pluralize } from 'ember-inflector';
import Intl from 'ember-intl/services/intl';
import Model from 'quizzen/models/base';

interface Args {
  records: Model[],
  modelName: string
}

export default class RecordDetailComponent extends Component<Args> {
  // Services
  @service intl!: Intl;
  @service router!: Router;


  // Getter and setter
  get hasPagination() {
    // @ts-ignore
    return this.args.records.meta.pagination.pages > 1;
  }

  get headline() {
    return this.intl.t(`models.plurals.${this.args.modelName}`);
  }

  get newPath() {
    return `profile.${pluralize(this.args.modelName)}.new`;
  }


  // Actions
  @action
  openRecord(record: Model) {
    let modelName = record.modelName;
    let editRoute = `profile.${pluralize(modelName)}.${modelName}`;

    this.router.transitionTo(editRoute, record);
  }
}
