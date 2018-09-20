import Ember from 'ember';

const {
  Route,
  get
} = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('category');
  },

  actions: {
    save(model) {
      model.save().then(() => this.transitionTo('admin.categories'));
    }
  }
});
