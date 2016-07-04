import Ember from 'ember';

const {
  $,
  Component,
  computed,
  isPresent,
  run
} = Ember;

export default Component.extend({
  tagName: 'header',
  classNames: ['site-nav'],
  classNameBindings: ['useFixed:fixed:static', 'showHeader:hide-nav'],
  headerHeight: 80,
  delta: 5,
  lastPosition: 0,
  isMobileOpen: false,

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
  },

  actions: {
    toggleNav() {
      if (!this.get('isMobileOpen')) {
        this._openNav();
      } else {
        this._closeNav();
      }
    }
  },
  click() {
    if (this.get('isMobileOpen')) {
      this._closeNav();
    }
  },
  _closeNav() {
    if (isPresent($)) {
      $('body').removeClass('menu-open')
    }
    this.set('isMobileOpen', false);
  },
  _openNav() {
    if (isPresent($)) {
      $('body').addClass('menu-open')
    }
    this.set('isMobileOpen', true);
  }
});
