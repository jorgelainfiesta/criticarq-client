import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

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
