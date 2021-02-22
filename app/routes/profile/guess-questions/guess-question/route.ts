import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  guess_question_id: string
}

export default class ProfileGuessQuestionsGuessQuestionRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ guess_question_id }: Params) {
    return this.store.findRecord('guess-question', guess_question_id);
  }
}
