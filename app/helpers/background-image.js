import Ember from 'ember';
const { String: { htmlSafe } } = Ember;

export function backgroundImage([imageUrl]) {
  return htmlSafe(`background-image: url(${imageUrl});`);
}

export default Ember.Helper.helper(backgroundImage);
