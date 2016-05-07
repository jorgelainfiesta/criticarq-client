import Ember from 'ember';
import ResetScrollTopMixin from 'criticarq-client/mixins/reset-scroll-top';

const {
  Route
} = Ember;

export default Route.extend(ResetScrollTopMixin, {
  model(params) {
    const categoryArticles = this.modelFor('articles.category');
    const currentArticle = categoryArticles.articles.findBy('slug', params.article_slug);
    const category =  categoryArticles.category;

    if (currentArticle.get('categories.firstObject.slug') !== category.get('slug')) {
      return this.transitionTo('articles.category.article', currentArticle.get('categories.firstObject.slug'), currentArticle.get('slug'));
    }
    return {
      article: currentArticle,
      category: categoryArticles.category
    };
  }
});
