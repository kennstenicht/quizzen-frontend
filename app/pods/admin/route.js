import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  actions: {
    toggleSearch(active) {
      set(this.controller, 'navigationBar', active);
    }
  }
});
