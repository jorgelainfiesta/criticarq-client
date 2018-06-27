import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import moment from 'moment';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

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
