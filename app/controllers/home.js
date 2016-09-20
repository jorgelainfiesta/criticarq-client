import Ember from 'ember';
import { task } from 'ember-concurrency';
const { get } = Ember;

export default Ember.Controller.extend({
  page: 1,
  totalPages: 2,

  loadMore: task(function * () {
    let { page, totalPages } = this.getProperties('page', 'totalPages');
    if (page === totalPages) {
      return;
    }

    let loadedArticles = this.get('model.articles.content');
    page += 1;

    let articles = yield this.store.query('article', {
      filter: {
        'tag__not_in': 6,
        paged: page,
        posts_per_page: 4
      }
    });

    this.set('page', page);
    loadedArticles.pushObjects(articles.content);
  })
});
