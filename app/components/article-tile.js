import Ember from 'ember';

const {
  computed,
  String: { htmlSafe }
} = Ember;

export default Ember.Component.extend({
  classNames: ['article-tile'],
  classNameBindings: ['categoryClass'],
  attributeBindings: ['style'],

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
  })
});
