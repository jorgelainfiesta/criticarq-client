import Ember from 'ember';

const {
  Component,
  run
} = Ember;

export default Component.extend({
  tagName: 'header',
  classNames: ['site-nav'],
  classNameBindings: ['fixed', 'showHeader:hide-nav'],
  headerHeight: 80,
  delta: 20,
  lastPosition: 0,

  init() {
    this._super(...arguments);
    window.onscroll = run.bind(this, this._checkScroll)
  },
  willDestroyElement() {
    window.onscroll = null;
  },
  _checkScroll() {
    run.throttle(this, this._addScrollClasses, 300);
  },
  _addScrollClasses() {
    const currentPosition = window.scrollY;
    const lastPosition = this.get('lastPosition');
    const delta = this.get('delta');
    const headerHeight = this.get('headerHeight');

    if (Math.abs(lastPosition - currentPosition) < delta) {
      return;
    }

    if (currentPosition > lastPosition  && currentPosition > headerHeight) {
      this.set('showHeader', true);
    } else {
      this.set('showHeader', false);
    }
    this.set('lastPosition', currentPosition);
  }
});
