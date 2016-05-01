import ENV from 'criticarq-client/config/environment';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: ENV.apiHost,
  namespace: 'wp-json/wp/v2'
});
