import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  contributorName: attr('string'),
  contributorBio: attr('string'),
  contributorImage: attr()
});
