import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

export default Route.extend(ResetScrollTopMixin, {
  model(params) {
    const { category } = this.modelFor('articles.category');
    const article = this.store.query('article', {
      slug: params.article_slug
    })
    .then((articles) => {
      return get(articles, 'firstObject');
    });

    return RSVP.hash({
      article,
      category
    });
  },

  afterModel(model) {
    const categorySlug = get(model, 'category.slug');
    const articleCategorySlug = get(model, 'article.categories.firstObject.slug');

    if (categorySlug !== articleCategorySlug) {
      const articleSlug = get(model, 'article.slug');
      return this.transitionTo('articles.category.article', categorySlug, articleSlug);
    }
  }
});
