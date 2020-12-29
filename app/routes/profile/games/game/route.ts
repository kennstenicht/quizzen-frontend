import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  game_id: string
}

export default class ProfileGamesGameRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ game_id }: Params) {
    return this.store.findRecord('game', game_id);
  }
}
