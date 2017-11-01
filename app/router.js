import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import config from './config/environment';


const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.getWithDefault('currentPath', 'unknown');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      this.get('metrics').trackPage({ page, title });
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
