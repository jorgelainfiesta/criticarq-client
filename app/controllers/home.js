import Controller from '@ember/controller';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default Controller.extend({
  page: 1,
  totalPages: 2,

  loadMore: task(function * () {
    let { page, totalPages } = this.getProperties('page', 'totalPages');
    if (page === totalPages) {
      return;
    }

    let loadedArticles = this.get('model.articles');
    page += 1;

    let articles = yield this.store.query('article', {
      filter: {
        'tag__not_in': 6,
        paged: page,
        posts_per_page: 4
      }
    });

    this.set('page', page);
    this.set('totalPages', get(articles, 'meta.total-pages'));
    loadedArticles.pushObjects(articles.toArray());
  })
});
