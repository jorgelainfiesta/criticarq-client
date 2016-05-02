import Ember from 'ember';

const {
  RSVP,
  Route
} = Ember;

export default Route.extend({
  model(params) {
    const articles = this.store.query('article', {
      category: params.category_slug
    });
    const category = this.store.query('category', {
      slug: params.category_slug
    })
    .then((loadedCategory) => {
      return loadedCategory.get('firstObject');
    });

    return RSVP.hash({
      articles,
      category
    });
  }
});
