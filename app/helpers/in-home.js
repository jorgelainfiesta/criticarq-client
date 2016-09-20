import Ember from 'ember';
const { get } = Ember;

export function inHome([postTags]) {
  return postTags.any((tag) => {
    return get(tag, 'id') === 6;
  });
}

export default Ember.Helper.helper(inHome);
