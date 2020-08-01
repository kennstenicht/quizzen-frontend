import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('profil', function() {
    this.route('questions', function() {
      this.route('question', { path: '/question_:id' });
      this.route('new');
    });
    this.route('categories', function() {
      this.route('new');
      this.route('category', { path: '/:category_id' });
    });
  });

  this.route('login', { path: '/' });
});
