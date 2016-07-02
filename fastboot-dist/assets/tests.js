define('criticarq-client/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('criticarq-client/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('criticarq-client/tests/components/app-nav.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/app-nav.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/app-nav.js should pass jshint.');
  });
});
define('criticarq-client/tests/components/article-single.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/article-single.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/article-single.js should pass jshint.');
  });
});
define('criticarq-client/tests/components/article-tile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/article-tile.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/article-tile.js should pass jshint.');
  });
});
define('criticarq-client/tests/components/category-label.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/category-label.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/category-label.js should pass jshint.');
  });
});
define('criticarq-client/tests/components/contributor-bio.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/contributor-bio.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/contributor-bio.js should pass jshint.');
  });
});
define('criticarq-client/tests/components/lazy-image.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/lazy-image.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/lazy-image.js should pass jshint.');
  });
});
define('criticarq-client/tests/components/social-widget.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/social-widget.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/social-widget.js should pass jshint.');
  });
});
define('criticarq-client/tests/helpers/contributors-names.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/contributors-names.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/contributors-names.js should pass jshint.');
  });
});
define('criticarq-client/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('criticarq-client/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('criticarq-client/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'criticarq-client/tests/helpers/start-app', 'criticarq-client/tests/helpers/destroy-app'], function (exports, _qunit, _criticarqClientTestsHelpersStartApp, _criticarqClientTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _criticarqClientTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _criticarqClientTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('criticarq-client/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('criticarq-client/tests/helpers/resolver', ['exports', 'criticarq-client/resolver', 'criticarq-client/config/environment'], function (exports, _criticarqClientResolver, _criticarqClientConfigEnvironment) {

  var resolver = _criticarqClientResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _criticarqClientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _criticarqClientConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('criticarq-client/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('criticarq-client/tests/helpers/start-app', ['exports', 'ember', 'criticarq-client/app', 'criticarq-client/config/environment'], function (exports, _ember, _criticarqClientApp, _criticarqClientConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _criticarqClientConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _criticarqClientApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('criticarq-client/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('criticarq-client/tests/mixins/reset-scroll-top.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins/reset-scroll-top.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/reset-scroll-top.js should pass jshint.');
  });
});
define('criticarq-client/tests/models/article.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/article.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/article.js should pass jshint.');
  });
});
define('criticarq-client/tests/models/author.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/author.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/author.js should pass jshint.');
  });
});
define('criticarq-client/tests/models/category.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/category.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/category.js should pass jshint.');
  });
});
define('criticarq-client/tests/models/contributor.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/contributor.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/contributor.js should pass jshint.');
  });
});
define('criticarq-client/tests/models/tag.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/tag.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/tag.js should pass jshint.');
  });
});
define('criticarq-client/tests/models/taxonomy.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/taxonomy.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/taxonomy.js should pass jshint.');
  });
});
define('criticarq-client/tests/models/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass jshint.');
  });
});
define('criticarq-client/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('criticarq-client/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('criticarq-client/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('criticarq-client/tests/routes/articles/category/article.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/articles/category/article.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/articles/category/article.js should pass jshint.');
  });
});
define('criticarq-client/tests/routes/articles/category/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/articles/category/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/articles/category/index.js should pass jshint.\nroutes/articles/category/index.js: line 10, col 9, \'params\' is defined but never used.\n\n1 error');
  });
});
define('criticarq-client/tests/routes/articles/category.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/articles/category.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/articles/category.js should pass jshint.');
  });
});
define('criticarq-client/tests/routes/articles/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/articles/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/articles/index.js should pass jshint.');
  });
});
define('criticarq-client/tests/routes/articles.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/articles.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/articles.js should pass jshint.');
  });
});
define('criticarq-client/tests/routes/home.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/home.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/home.js should pass jshint.');
  });
});
define('criticarq-client/tests/routes/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('criticarq-client/tests/test-helper', ['exports', 'criticarq-client/tests/helpers/resolver', 'ember-qunit'], function (exports, _criticarqClientTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_criticarqClientTestsHelpersResolver['default']);
});
define('criticarq-client/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('criticarq-client/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('criticarq-client/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('criticarq-client/tests/unit/models/post-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('post', 'Unit | Model | post', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('criticarq-client/tests/unit/models/post-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/post-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/post-test.js should pass jshint.');
  });
});
define('criticarq-client/tests/unit/models/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('criticarq-client/tests/unit/models/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/user-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('criticarq-client/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map