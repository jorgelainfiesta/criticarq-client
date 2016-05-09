import Ember from 'ember';

const {
  Component,
  computed,
  run
} = Ember;

export default Component.extend({
  tagName: 'header',
  classNames: ['site-nav'],
  classNameBindings: ['useFixed:fixed:static', 'showHeader:hide-nav'],
  headerHeight: 80,
  delta: 5,
  lastPosition: 0,

  useFixed: computed('fixed', 'useHomeNav', {
    get() {
      return this.get('fixed') && !this.get('useHomeNav');
    }
  }),

  init() {
    this._super(...arguments);
    window.onscroll = run.bind(this, this._checkScroll);
  },
  willDestroyElement() {
    window.onscroll = null;
  },
  _checkScroll() {
    if (!this.get('useHomeNav')) {
      run.throttle(this, this._addScrollClasses, 150);
    }
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
