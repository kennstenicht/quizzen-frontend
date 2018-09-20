import Ember from 'ember';

const {
  Route,
  get
} = Ember;

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },

  model(params) {
    return get(this, 'store').query('category', params);
  }
});
