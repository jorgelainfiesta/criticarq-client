import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  caption: attr('string'),
  source_url: attr('string')
});
