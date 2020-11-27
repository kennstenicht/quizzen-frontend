import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  quiz_id: string
}

export default class ProfileQuizzesQuizRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ quiz_id }: Params) {
    return this.store.findRecord('quiz', quiz_id);
  }
}
