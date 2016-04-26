import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  content: attr('string'),
  excerpt: attr('string'),
  authorsShort: attr('string'),
  contributors: hasMany()
});
