import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

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

export default Router;
