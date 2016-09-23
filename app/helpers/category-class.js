import Ember from 'ember';

export function categoryClass([categorySlug]) {
  return `category-${categorySlug}`;
}

export default Ember.Helper.helper(categoryClass);
