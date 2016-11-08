import Ember from 'ember';
import { task } from 'ember-concurrency';
const { get } = Ember;

export default Ember.Controller.extend({
  loadMore: task(function * () {
    let { page, totalPages } = this.getProperties('page', 'totalPages');
    if (page === totalPages) {
      return;
    }

    let loadedArticles = this.get('model.events.content');
    page += 1;

    let articles = yield this.store.query('event', {
      filter: {
        paged: page,
        posts_per_page: 4
      }
    });

    this.set('page', page);
    loadedArticles.pushObjects(articles.content);
  })
});
