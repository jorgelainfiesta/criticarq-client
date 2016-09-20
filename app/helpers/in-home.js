import Ember from 'ember';
const { get } = Ember;

export function inHome([postTags]) {
  console.info(postTags.any((tag) => {
    return get(tag, 'id') == 6;
  }));
  return postTags.any((tag) => {
    return get(tag, 'id') == 6;
  });
}

export default Ember.Helper.helper(inHome);
