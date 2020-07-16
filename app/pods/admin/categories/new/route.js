import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('category');
  },

  actions: {
    save(model) {
      model.save().then(() => this.transitionTo('admin.categories'));
    }
  }
});
