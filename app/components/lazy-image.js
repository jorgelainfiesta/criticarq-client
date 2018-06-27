import { setProperties } from '@ember/object';
import LazyImage from 'ember-lazy-image/components/lazy-image';

export default LazyImage.extend({
  didInsertElement() {
    this._super();
    setProperties(this, {
      viewportUseRAF: true,
      viewportSpy: false,
      viewportRefreshRate: 150,
      viewportTolerance: {
        top: 50,
        bottom: 50,
        left: 20,
        right: 20
      }
    });
  }
});
