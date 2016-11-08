import Ember from 'ember';
import config from './config/environment';

const {
  inject: { service }
} = Ember;

const Router = Ember.Router.extend({
  location: config.locationType,

  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.pathname;
      const title = this.getWithDefault('currentRouteName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('articles', { path: 'articulos' }, function() {
    this.route('category', { path: ':category_slug'}, function() {
      this.route('article', { path: ':article_slug' }, function() {
        this.route('category');
      });
    });
  });
  this.route('home', { path: 'portada' });
  this.route('events', { path: 'eventos' }, function() {
    this.route('event', { path: ':event_slug' });
  });
});

export default Router;
