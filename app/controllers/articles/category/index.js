import Ember from 'ember';
import { task } from 'ember-concurrency';
const { get } = Ember;

export default Ember.Controller.extend({
  loadMore: task(function * () {
    let { page, totalPages } = this.getProperties('page', 'totalPages');
    if (page === totalPages) {
      return;
    }

    let category = this.get('model.category');
    let loadedArticles = this.get('model.articles.content');
    page += 1;

    let articles = yield this.store.query('article', {
      filter: {
        category_name: get(category, 'slug'),
        paged: page,
        posts_per_page: 4
      }
    });

    this.set('page', page);
    loadedArticles.pushObjects(articles.content);
  })
});
