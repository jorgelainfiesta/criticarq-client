import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  RSVP,
  Route
} = Ember;

export default Route.extend(ResetScrollTopMixin, {
  model(params) {
    const filter = {
      category_name: params.category_slug
    };
    const articles = this.store.query('article', {
      filter
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
