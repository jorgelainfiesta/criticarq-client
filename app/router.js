import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('articles', { path: 'articulos' }, function() {
    this.route('category', { path: ':category_slug'}, function() {
      this.route('article', { path: ':article_slug' }, function() {
        this.route('category');
      });
    });
  });
  this.route('home');
});

export default Router;
