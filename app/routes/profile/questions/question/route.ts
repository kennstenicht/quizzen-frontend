import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  question_id: string
}

export default class ProfileQuestionsQuestionRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ question_id }: Params) {
    return this.store.findRecord('question', question_id);
  }
}
