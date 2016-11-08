import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  content: attr('string'),
  slug: attr('string'),
  socialText: attr('string'),
  startDate: attr('date'),
  endDate: attr('date'),
  location: attr('string'),

  featured: attr(),

  contributors: hasMany(),
});
