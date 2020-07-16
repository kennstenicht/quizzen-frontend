import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },

  model(params) {
    return this.store.query('category', params);
  }
});
