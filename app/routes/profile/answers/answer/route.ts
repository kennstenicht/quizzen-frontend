import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  answer_id: string
}

export default class ProfileAnswersAnswerRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ answer_id }: Params) {
    return this.store.findRecord('answer', answer_id);
  }
}
