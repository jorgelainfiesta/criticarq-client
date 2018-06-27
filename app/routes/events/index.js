import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    const events = this.store.findAll('event');

    return RSVP.hash({
      events
    });
  },

  setupController(controller, model) {
    controller.totalPages = get(model, 'meta.totalPages');
    controller.page = 1;
    this._super(...arguments);
  }
});
