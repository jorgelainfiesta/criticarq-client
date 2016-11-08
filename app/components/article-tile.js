import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['article-tile'],
  click() {
    this.sendAction('onClick');
  }
});
