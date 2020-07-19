import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfilQuestionsNewRoute extends Route {
  // Services
  @service store;


  // Hooks
  model() {
    return this.store.createRecord('question');
  }
}
