import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  get,
  inject: { service },
  RSVP,
  Route
} = Ember;

export default Route.extend(ResetScrollTopMixin, {
  header: service(),

  activate() {
    this.set('header.home', true);
  },
  deactivate() {
    this.set('header.home', false);
  },
  model() {
    let featured = this.store.query('article', {
      filter: {
        tag: 'home'
      }
    });

    let articles = this.store.query('article', {
      filter: {
        paged: 1,
        posts_per_page: 4,
        orderby: 'rand'
      }
    });

    return RSVP.hash({
      featured,
      articles
    });
  },
  setupController(controller, model) {
    controller.totalPages = get(model, 'meta.totalPages');
    controller.page = 1;
    this._super(...arguments);
  }
});
