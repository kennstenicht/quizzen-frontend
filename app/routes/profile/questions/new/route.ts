import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';
import Breadcrumb from 'quizzen/services/breadcrumb';

export default class ProfileQuestionsNewRoute extends Route {
  // Services
  @service breadcrumb!: Breadcrumb;
  @service store!: Store;


  // Hooks
  model() {
    let routeItem = this.breadcrumb.findRoute('profile.questions.new');

    if (routeItem?.mainForm) {
      return routeItem?.mainForm.model;
    } else {
      return this.store.createRecord('question');
    }
  }
}
