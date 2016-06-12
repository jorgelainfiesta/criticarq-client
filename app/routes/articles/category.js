import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  Route
} = Ember;

export default Route.extend(ResetScrollTopMixin, {
  model(params) {
    const category = this.store.peekAll('category').findBy('slug', params.category_slug);

    return {
      category
    };
  }
});
