import Route from '@ember/routing/route';
import Transition from '@ember/routing/-private/transition';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import confirmUnsavedChanges from 'quizzen/utils/confirm-unsaved-changes';

interface Params {
  category_id: string
}

export default class ProfilCategoriesCategoryRoute extends Route {
  // Services
  @service store!: Store;


  // Hooks
  model({ category_id }: Params) {
    return this.store.findRecord('category', category_id);
  }


  // Actions
  @action
  willTransition(transition: Transition) {
    confirmUnsavedChanges(transition, this.controller);
  }
}
