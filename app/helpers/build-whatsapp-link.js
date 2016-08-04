import Ember from 'ember';

export function buildWhatsappLink([title]) {
  let url = document.URL;
  let link = `whatsapp://send?text=${title} ${url}`;
  return link;
}

export default Ember.Helper.helper(buildWhatsappLink);
