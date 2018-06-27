import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Helper.extend({
  router: service('-routing'),
  currentUrl: computed('router.router.url', function() {
    return `http://criticarq.gt${this.get('router.router.url')}`;
  }),

  compute() {
    return this.get('currentUrl');
  }
});
