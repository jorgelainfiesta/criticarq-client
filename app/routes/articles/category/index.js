import Ember from 'ember';

const {
  RSVP,
  Route
} = Ember;

export default Route.extend({
  model(params) {
    const articles = this.store.query('article', {
      slug: params.slug
    });
    const { category } = this.modelFor('articles.category');

    return RSVP.hash({
      category,
      articles
    });
  }
});
