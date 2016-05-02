import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const text = this.get('text');
    this.$().jsSocials({
      shares: ['email', 'twitter', 'facebook', 'linkedin', 'pinterest', 'whatsapp'],
      text
    });
  }
});
