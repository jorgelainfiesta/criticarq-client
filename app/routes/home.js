import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  A,
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

    let events = this.store.findAll('event');

    return RSVP.hash({
      featured,
      events,
      articles: A()
    });
  },
  setupController(controller) {
    controller.totalPages = 2;
    controller.page = 1;
    this._super(...arguments);
  }
});
