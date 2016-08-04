import Ember from 'ember';

const {
  get,
  inject: { service }
} = Ember;

export default Ember.Mixin.create({
  fastboot: service(),

  beforeModel() {
    this._super(...arguments);
    let fastboot = this.get('fastboot');
    if (!get(fastboot, 'isFastBoot')) {
      window.scrollTo(0,0);
    }
  }
});
