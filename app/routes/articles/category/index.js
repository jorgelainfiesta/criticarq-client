import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    const { category } = this.modelFor('articles.category');
    const articles = this.store.query('article', {
      filter: {
        category_name: get(category, 'slug'),
        paged: 1,
        posts_per_page: 4
      }
    });

    return RSVP.hash({
      category,
      articles
    });
  },

  setupController(controller, model) {
    controller.totalPages = get(model, 'meta.totalPages');
    controller.page = 1;
    this._super(...arguments);
  }
});
