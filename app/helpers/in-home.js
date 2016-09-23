import Ember from 'ember';
const { get } = Ember;

export function inHome([postTags]) {
  return postTags.any((tag) => {
    return parseInt(get(tag, 'id')) === 6;
  });
}

export default Ember.Helper.helper(inHome);
