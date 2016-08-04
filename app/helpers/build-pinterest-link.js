import Ember from 'ember';

export function buildPinterestLink([title, image]) {
  let url = document.URL;
  let link = `https://pinterest.com/pin/create/bookmarklet/?media=${image}&url=${url}&description=${title}`;
  return link;
}

export default Ember.Helper.helper(buildPinterestLink);
