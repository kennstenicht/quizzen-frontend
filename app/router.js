import EmberRouter from '@ember/routing/router';
import config from 'quizzen/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('login', { path: '/' });

  this.route('profile', function() {
    this.route('categories', function() {
      this.route('new');
      this.route('category', { path: '/:category_id' });
    });
    this.route('quizzes', function() {
      this.route('quiz', { path: '/:quiz_id' });
      this.route('new');
    });
    this.route('questions', function() {
      this.route('new');
      this.route('question', { path: '/:question_id' });
    });
  });

  this.route('user', { path: 'users/:user_nickname' });
});
