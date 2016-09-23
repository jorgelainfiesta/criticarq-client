import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  get,
  RSVP,
  Route
} = Ember;

export default Route.extend(ResetScrollTopMixin, {
  activate() {
    this.send('useHomeNav', true);
  },
  deactivate() {
    this.send('useHomeNav', false);
  },
  model() {
    let featured = this.store.query('article', {
      filter: {
        tag: 'home'
      }
    });

    let articles = this.store.query('article', {
      filter: {
        'tag__not_in': ['6'],
        paged: 1,
        posts_per_page: 4,

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
