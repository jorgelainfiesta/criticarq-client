import Route from '@ember/routing/route';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

export default Route.extend(ResetScrollTopMixin, {
  model(params) {
    const category = this.store.peekAll('category').findBy('slug', params.category_slug);

    return {
      category
    };
  }
});
