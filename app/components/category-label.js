import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['category-label'],
  classNameBindings: ['categoryClass'],

  categoryClass: computed('category.slug', {
    get() {
      return `category-${this.get('category.slug')}`;
    }
  })
});
