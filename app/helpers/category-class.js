import Ember from 'ember';
const { String: { htmlSafe } } = Ember;

export function categoryClass([categorySlug]) {
  return htmlSafe(`category-${categorySlug}`);
}

export default Ember.Helper.helper(categoryClass);
