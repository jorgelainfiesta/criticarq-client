import SocialLinkHelper from './build-social-link';

export default SocialLinkHelper.extend({
  compute() {
    let url = this.get('currentUrl');
    let link = `https://facebook.com/sharer/sharer.php?u=${url}`;
    return link;
  }
});
