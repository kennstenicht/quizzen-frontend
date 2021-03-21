import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import { BufferedChangeset } from 'ember-changeset/types';
import Model from 'quizzen/models/base';
import Breadcrumb from 'quizzen/services/breadcrumb';

interface Args {
  model: Model,
  submit?: Function,
}

export default class UiFormComponent extends Component<Args> {
  // Services
  @service breadcrumb!: Breadcrumb;
  @service router!: Router;


  // Defaults
  @tracked changeset!: BufferedChangeset;


  // Getter and setter
  get modelName(): string {
    return this.args.model.modelName;
  }


  @action
  loadChangeset() {
    let routeName = this.router.currentRoute.name;
    // @ts-ignore
    let model = this.router.currentRoute.attributes;
    let route = this.breadcrumb.getItem(routeName, model);

    this.changeset = route.getChangeset(this.args.model);
  }
}
