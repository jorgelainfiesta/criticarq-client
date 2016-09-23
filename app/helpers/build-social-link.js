import Ember from 'ember';
const { inject: { service }, computed } = Ember;

export default Ember.Helper.extend({
  router: service('-routing'),
  currentUrl: computed('router.router.url', function() {
    return `http://criticarq.gt${this.get('router.router.url')}`;
  }),

  compute() {
    return this.get('currentUrl');
  }
});
