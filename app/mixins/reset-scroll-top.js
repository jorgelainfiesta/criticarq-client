import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({
  fastboot: service(),

  beforeModel() {
    this._super(...arguments);
    let fastboot = this.get('fastboot');
    if (!get(fastboot, 'isFastBoot')) {
      window.scrollTo(0,0);
    }
  }
});
