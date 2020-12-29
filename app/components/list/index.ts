import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import { action } from '@ember/object';
import { pluralize } from 'ember-inflector';
import Model from '@ember-data/model';

interface Args {
  records: any,
  layout: string,
  modelName: string
}

export default class ListComponent extends Component<Args> {
  // Services
  @service router!: Router;


  // Getter and setter
  get isCardLayout() {
    return this.args.layout === 'card';
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
