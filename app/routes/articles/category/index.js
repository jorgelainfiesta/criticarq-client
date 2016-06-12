import Ember from 'ember';

const {
  get,
  RSVP,
  Route
} = Ember;

export default Route.extend({
  model(params) {
    const { category } = this.modelFor('articles.category');
    const articles = this.store.query('article', {
      filter: {
        category_name: get(category, 'slug')
      }
    });

    return RSVP.hash({
      category,
      articles
    });
  }
});
