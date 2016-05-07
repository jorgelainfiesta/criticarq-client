import Ember from 'ember';

export default Ember.Mixin.create({
  afterModel() {
    this._super(...arguments);
    window.scrollTo(0,0);
  }
});
