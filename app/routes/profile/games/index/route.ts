import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  page: number
}

export default class ProfileGameIndexRoute extends Route {
  // Services
  @service store!: Store;


  // Defaults
  queryParams = {
    page: {
      refreshModel: true
    }
  }


  // Hooks
  model({ page }: Params) {
    return this.store.query('game', {
      page: {
        number: page || 1
      }
    });
  }
}
