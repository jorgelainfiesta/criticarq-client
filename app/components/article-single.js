import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['article-single'],
  classNameBindings: ['preview:preview:full', 'categoryClass'],

  categoryClass: computed('category.slug', {
    get() {
      return `category-${this.get('category.slug')}`;
    }
  })
});
