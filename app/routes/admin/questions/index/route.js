import Route from '@ember/routing/route';

export default class AdminQuestionsIndexRoute extends Route {
  model() {
    return this.store.findAll('question');
  }
}
