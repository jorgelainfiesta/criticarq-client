import Controller from '@ember/controller';
import { get, getProperties, set } from '@ember/object';
import { task } from 'ember-concurrency';

export default Controller.extend({
  loadMore: task(function * () {
    let { page, totalPages } = getProperties(this, 'page', 'totalPages');
    if (page === totalPages) {
      return;
    }

    let loadedArticles = get(this, 'model.events.content');
    page += 1;

    let articles = yield this.store.query('event', {
      filter: {
        paged: page,
        posts_per_page: 4
      }
    });

    set(this, 'page', page);
    loadedArticles.pushObjects(articles.content);
  })
});
