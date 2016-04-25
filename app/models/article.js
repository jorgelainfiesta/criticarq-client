import PostModel from 'ember-wordpress/models/post';
import { belongsTo } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default PostModel.extend({
  authors_short: attr('string'),
  featured_media: belongsTo('medium')
});
