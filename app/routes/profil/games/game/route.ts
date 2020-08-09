import Route from '@ember/routing/route';
import Transition from '@ember/routing/-private/transition';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import confirmUnsavedChanges from 'quizzen/utils/confirm-unsaved-changes';

interface Params {
  game_id: string
}

export default class ProfilGamesGameRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ game_id }: Params) {
    return this.store.findRecord('game', game_id);
  }


  // Actions
  @action
  willTransition(transition: Transition) {
    confirmUnsavedChanges(transition, this.controller);
  }
}
