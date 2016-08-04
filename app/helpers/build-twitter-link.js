import Ember from 'ember';

export function buildTwitterLink([title]) {
  let url = document.URL;
  let link = `https://twitter.com/intent/tweet?text='${title}'&amp;url='${url}`;
  return link;
}

export default Ember.Helper.helper(buildTwitterLink);
