import Ember from 'ember';

export function buildFacebookLink() {
  let url = document.URL;
  let link = `https://facebook.com/sharer/sharer.php?u=${url}`;
  return link;
}

export default Ember.Helper.helper(buildFacebookLink);
