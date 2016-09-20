import SocialLinkHelper from './build-social-link';

export default SocialLinkHelper.extend({
  compute([title, image]) {
    let url = this.get('currentUrl');
    let link = `https://pinterest.com/pin/create/bookmarklet/?media=${image}&url=${url}&description=${title}`;
    return link;
  }
});
