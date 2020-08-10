import Route from '@ember/routing/route';
import Transition from '@ember/routing/-private/transition';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import confirmUnsavedChanges from 'quizzen/utils/confirm-unsaved-changes';

interface Params {
  quiz_id: string
}

export default class ProfilQuizzesQUIZRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ quiz_id }: Params) {
    return this.store.findRecord('quiz', quiz_id);
  }


  // Actions
  @action
  willTransition(transition: Transition) {
    confirmUnsavedChanges(transition, this.controller);
  }
}
