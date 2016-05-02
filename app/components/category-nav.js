import Ember from 'ember';

const {
  computed,
  Component
} = Ember;

export default Component.extend({
  tagName: '',
  categoryUrl: computed('category.slug', {
    get() {
      const slug = this.get('category.slug');
      return `/articulos/${slug}`;
    }
  })
});
