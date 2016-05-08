import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  RSVP,
  Route
} = Ember;

export default Route.extend(ResetScrollTopMixin, {
  model() {
    const filter = {
      tag: 'home'
    };
    const articles = this.store.query('article', {
      filter
    });

    return RSVP.hash({
      articles
    });
  }
});
