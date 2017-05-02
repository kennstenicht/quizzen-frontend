import Ember from 'ember';

const {
  Route,
  get
} = Ember;

export default Route.extend({
  model(params) {
    return this.store.findRecord('question', params.id);
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
