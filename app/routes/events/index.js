import Ember from 'ember';

const {
  get,
  RSVP,
  Route
} = Ember;

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
