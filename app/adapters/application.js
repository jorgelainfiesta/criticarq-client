import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://104.197.75.19',
  namespace: 'wp-json/wp/v2'
});
