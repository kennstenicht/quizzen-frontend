import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  page: number
  q: string
}

export default class ProfileCategoriesIndexRoute extends Route {
  // Services
  @service store!: Store;


  // Defaults
  queryParams = {
    page: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  }


  // Hooks
  model({ page, q }: Params) {
    return this.store.query('category', {
      page: {
        number: page
      },
      filter: {
        search_i_cont: q
      }
    });
  }
}
