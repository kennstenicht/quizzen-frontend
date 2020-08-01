import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfilQGamesIndexRoute extends Route {
  // Services
  @service store;


  // Hooks
  model() {
    return this.store.findAll('game');
  }
}
