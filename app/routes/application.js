import Ember from 'ember';

const {
  RSVP,
  Route
} = Ember;

export default Route.extend({
  model() {
    const categories = this.store.findAll('category')
    .then((loadedCategories) => {
      return loadedCategories.filter((category) => {
        return category.get('slug') !== 'uncategorized';
      });
    });

    return RSVP.hash({
      categories
    });
  }
});
