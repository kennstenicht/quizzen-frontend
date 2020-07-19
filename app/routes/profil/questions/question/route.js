import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfilQuestionsQuestionRoute extends Route {
  // Services
  @service store;


  // Hooks
  model({ id }) {
    return this.store.findRecord('question', id);
  }
}
