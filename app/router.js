import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('admin', function() {
    this.route('question');
    this.route('questions', function() {
      this.route('question', {path: '/:id'});
      this.route('new');
    });
    this.route('categories', function() {
      this.route('new');
      this.route('category');
    });
  });
});
