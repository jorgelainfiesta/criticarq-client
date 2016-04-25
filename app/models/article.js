import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  title: attr('string'),
  content: attr('string'),
  excerpt: attr('string'),
  authorsShort: attr('string')
});
