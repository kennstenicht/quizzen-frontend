import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('question');
  },

  actions: {
    save(model) {
      model.answers.forEach(function (answer) {
        answer.save();
      });
      model.save().then(() => this.transitionTo('admin.questions'));
    },

    addAnswer(model) {
      const answer = this.store.createRecord('answer');

      model.answers.pushObject(answer);
    }
  }
});
