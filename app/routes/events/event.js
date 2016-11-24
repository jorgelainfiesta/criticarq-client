import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  get,
  RSVP,
  Route
} = Ember;

export default Route.extend(ResetScrollTopMixin, {
  model(params) {
    const event = this.store.query('event', {
      slug: params.event_slug
    })
    .then((events) => {
      return get(events, 'firstObject');
    });

    return RSVP.hash({
      event
    });
  }
});
