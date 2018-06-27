import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['article-single'],
  classNameBindings: ['preview:preview:full', 'categoryClass'],

  categoryClass: computed('category.slug', function() {
    return `category-${this.get('category.slug')}`;
  })
});
