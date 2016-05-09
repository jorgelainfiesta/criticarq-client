import Ember from 'ember';

const {
  computed,
  String: { htmlSafe },
  inject: { service }
} = Ember;

export default Ember.Component.extend({
  classNames: ['article-tile'],
  classNameBindings: ['categoryClass'],

  router: service('-routing'),

  style: computed('article.featured.large.url', {
    get() {
      const featuredImage = this.get('article.featured.large.url');
      return htmlSafe(`background-image: url(${featuredImage})`);
    }
  }),

  category: computed('article.categories', {
    get() {
      return this.get('article.categories.firstObject');
    }
  }),
  categoryClass: computed('category', {
    get() {
      return `category-${this.get('category.slug')}`;
    }
  }),

  click() {
    const article = this.get('article.slug');
    const category = this.get('category.slug');
    this.get('router').transitionTo('articles.category.article', [category, article]);
  }
});
