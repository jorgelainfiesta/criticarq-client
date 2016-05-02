import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model(params) {
    const categoryArticles = this.modelFor('articles.category');
    const currentArticle = categoryArticles.articles.findBy('slug', params.article_slug);

    return {
      article: currentArticle,
      category: categoryArticles.category
    };
  }
});
