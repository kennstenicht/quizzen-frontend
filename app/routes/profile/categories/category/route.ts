import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Store from '@ember-data/store';

interface Params {
  category_id: string
}

export default class ProfileCategoriesCategoryRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ category_id }: Params) {
    return this.store.findRecord('category', category_id);
  }
}
