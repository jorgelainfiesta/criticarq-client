import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['category-label'],
  classNameBindings: ['categoryClass'],

  categoryClass: computed('category.slug', function() {
    return `category-${this.get('category.slug')}`;
  })
});
