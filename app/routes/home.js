import Ember from 'ember';

const {
  RSVP,
  Route
} = Ember;

export default Route.extend({
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
