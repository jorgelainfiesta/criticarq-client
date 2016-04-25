import DS from 'ember-data';
import PostModel from 'ember-wordpress/models/post';
import attr from 'ember-data/attr';

export default PostModel.extend({
  caption: attr('string'),
  source_url: attr('string')
});
