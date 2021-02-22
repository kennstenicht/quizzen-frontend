import EmberRouter from '@ember/routing/router';
import config from 'quizzen/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('games', { path: '/mit' }, function() {
    this.route('index', { path: '/' });
    this.route('game', { path: '/:user_nickname' });
  });

  this.route('login', { path: '/' });

  this.route('profile', function() {
    this.route('answers', function() {
      this.route('answer', { path: '/:answer_id' });
      this.route('index', { path: '/' });
      this.route('new');
    });

    this.route('categories', function() {
      this.route('category', { path: '/:category_id' });
      this.route('index', { path: '/' });
      this.route('new');
    });

    this.route('games', function() {
      this.route('game', { path: '/:game_id' });
      this.route('index', { path: '/' });
      this.route('new');
    });

    this.route('guess-questions', function() {
      this.route('guess-question', { path: '/:guess_question_id' });
      this.route('index', { path: '/' });
      this.route('new');
    });

    this.route('quizzes', function() {
      this.route('index', { path: '/' });
      this.route('new');
      this.route('quiz', { path: '/:quiz_id' });
    });

    this.route('questions', function() {
      this.route('index', { path: '/' });
      this.route('new');
      this.route('question', { path: '/:question_id' });
    });

    this.route('user', { path: '/:user_nickname' });
  });
});
