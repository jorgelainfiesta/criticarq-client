import Ember from 'ember';
import moment from 'moment';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  A,
  inject: { service },
  get,
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

  afterModel(model) {
    let { events } = model;
    let now = moment();
    model.events = events.filter(function(event) {
      let startDate = moment(get(event, 'startDate'));
      return startDate.isAfter(now);
    });
  },

  setupController(controller) {
    controller.totalPages = 2;
    controller.page = 1;
    this._super(...arguments);
  }
});
