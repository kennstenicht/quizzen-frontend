import Ember from 'ember';

const {
  Route,
  get
} = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('question');
  },

  actions: {
    save(model) {
      get(model, 'answers').forEach(function (answer) {
        answer.save();
      });
      model.save().then(() => this.transitionTo('admin.questions'));
    },

    addAnswer(model) {
      const answer = this.store.createRecord('answer');

      model.get('answers').pushObject(answer);
    }
  }
});
