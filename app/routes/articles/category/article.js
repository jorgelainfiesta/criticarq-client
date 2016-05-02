import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
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
