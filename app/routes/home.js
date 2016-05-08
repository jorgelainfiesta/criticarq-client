import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
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
