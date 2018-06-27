import Component from '@ember/component';

export default Component.extend({
  classNames: ['article-tile'],
  click() {
    this.get('onClick')();
  }
});
