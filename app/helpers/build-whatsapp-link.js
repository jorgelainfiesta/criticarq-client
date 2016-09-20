import SocialLinkHelper from './build-social-link';

export default SocialLinkHelper.extend({
  compute([title]) {
    let url = this.get('currentUrl');
    let link = `whatsapp://send?text=${title} ${url}`;
    return link;
  }
});
