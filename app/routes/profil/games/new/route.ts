import Route from '@ember/routing/route';
import Transition from '@ember/routing/-private/transition';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import confirmUnsavedChanges from 'quizzen/utils/confirm-unsaved-changes';

export default class ProfilGamesNewRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model() {
    return this.store.createRecord('game');
  }


  // Actions
  @action
  willTransition(transition: Transition) {
    confirmUnsavedChanges(transition, this.controller);
  }
}
