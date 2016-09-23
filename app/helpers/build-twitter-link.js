import SocialLinkHelper from './build-social-link';

export default SocialLinkHelper.extend({
  compute([title]) {
    let url = this.get('currentUrl');
    let link = `https://twitter.com/intent/tweet?text='${title} ${url}`;
    return link;
  }
});
