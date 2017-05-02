import Ember from 'ember';

const {
  Route,
  set
} = Ember;

export default Route.extend({
  actions: {
    toggleSearch(active) {
      set(this.controller, 'navigationBar', active)
    }
  }
});
