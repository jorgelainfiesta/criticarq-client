"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('criticarq-client/adapters/application', ['exports', 'criticarq-client/config/environment', 'ember-data'], function (exports, _criticarqClientConfigEnvironment, _emberData) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend({
    host: _criticarqClientConfigEnvironment['default'].apiHost,
    namespace: 'wp-json/wp/v2'
  });
});
define('criticarq-client/app', ['exports', 'ember', 'criticarq-client/resolver', 'ember/load-initializers', 'criticarq-client/config/environment'], function (exports, _ember, _criticarqClientResolver, _emberLoadInitializers, _criticarqClientConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _criticarqClientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _criticarqClientConfigEnvironment['default'].podModulePrefix,
    Resolver: _criticarqClientResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _criticarqClientConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('criticarq-client/components/app-nav', ['exports', 'ember'], function (exports, _ember) {
  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var run = _ember['default'].run;
  exports['default'] = Component.extend({
    tagName: 'header',
    classNames: ['site-nav'],
    classNameBindings: ['useFixed:fixed:static', 'showHeader:hide-nav'],
    headerHeight: 80,
    delta: 5,
    lastPosition: 0,

    useFixed: computed('fixed', 'useHomeNav', {
      get: function get() {
        return this.get('fixed') && !this.get('useHomeNav');
      }
    }),

    init: function init() {
      this._super.apply(this, arguments);
      window.onscroll = run.bind(this, this._checkScroll);
    },
    willDestroyElement: function willDestroyElement() {
      window.onscroll = null;
    },
    _checkScroll: function _checkScroll() {
      if (!this.get('useHomeNav')) {
        run.throttle(this, this._addScrollClasses, 150);
      }
    },
    _addScrollClasses: function _addScrollClasses() {
      var currentPosition = window.scrollY;
      var lastPosition = this.get('lastPosition');
      var delta = this.get('delta');
      var headerHeight = this.get('headerHeight');

      if (Math.abs(lastPosition - currentPosition) < delta) {
        return;
      }

      if (currentPosition > lastPosition && currentPosition > headerHeight) {
        this.set('showHeader', true);
      } else {
        this.set('showHeader', false);
      }
      this.set('lastPosition', currentPosition);
    }
  });
});
define('criticarq-client/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'criticarq-client/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _criticarqClientConfigEnvironment) {

  var name = _criticarqClientConfigEnvironment['default'].APP.name;
  var version = _criticarqClientConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('criticarq-client/components/article-single', ['exports', 'ember'], function (exports, _ember) {
  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  exports['default'] = Component.extend({
    classNames: ['article-single'],
    classNameBindings: ['preview:preview:full', 'categoryClass'],

    categoryClass: computed('category.slug', {
      get: function get() {
        return 'category-' + this.get('category.slug');
      }
    })
  });
});
define('criticarq-client/components/article-tile', ['exports', 'ember'], function (exports, _ember) {
  var computed = _ember['default'].computed;
  var htmlSafe = _ember['default'].String.htmlSafe;
  var service = _ember['default'].inject.service;
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['article-tile'],
    classNameBindings: ['categoryClass'],

    router: service('-routing'),

    style: computed('article.featured.large.url', {
      get: function get() {
        var featuredImage = this.get('article.featured.large.url');
        return htmlSafe('background-image: url(' + featuredImage + ')');
      }
    }),

    category: computed('article.categories', {
      get: function get() {
        return this.get('article.categories.firstObject');
      }
    }),
    categoryClass: computed('category', {
      get: function get() {
        return 'category-' + this.get('category.slug');
      }
    })
  });
});
define('criticarq-client/components/category-label', ['exports', 'ember'], function (exports, _ember) {
  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  exports['default'] = Component.extend({
    classNames: ['category-label'],
    classNameBindings: ['categoryClass'],

    categoryClass: computed('category.slug', {
      get: function get() {
        return 'category-' + this.get('category.slug');
      }
    })
  });
});
define('criticarq-client/components/contributor-bio', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['contributor-bio']
  });
});
define('criticarq-client/components/disqus-comment-count', ['exports', 'ember-disqus/components/disqus-comment-count'], function (exports, _emberDisqusComponentsDisqusCommentCount) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusComponentsDisqusCommentCount['default'];
    }
  });
});
define('criticarq-client/components/disqus-comments', ['exports', 'ember-disqus/components/disqus-comments'], function (exports, _emberDisqusComponentsDisqusComments) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusComponentsDisqusComments['default'];
    }
  });
});
define('criticarq-client/components/ember-load-remover', ['exports', 'ember-load/components/ember-load-remover'], function (exports, _emberLoadComponentsEmberLoadRemover) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLoadComponentsEmberLoadRemover['default'];
    }
  });
});
define('criticarq-client/components/head-content', ['exports', 'ember', 'criticarq-client/templates/head'], function (exports, _ember, _criticarqClientTemplatesHead) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    model: _ember['default'].inject.service('head-data'),
    layout: _criticarqClientTemplatesHead['default']
  });
});
define('criticarq-client/components/head-layout', ['exports', 'ember', 'ember-cli-head/templates/components/head-layout'], function (exports, _ember, _emberCliHeadTemplatesComponentsHeadLayout) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: '',
    layout: _emberCliHeadTemplatesComponentsHeadLayout['default']
  });
});
define('criticarq-client/components/lazy-background-image', ['exports', 'ember-lazy-image/components/lazy-background-image'], function (exports, _emberLazyImageComponentsLazyBackgroundImage) {
  exports['default'] = _emberLazyImageComponentsLazyBackgroundImage['default'];
});
define('criticarq-client/components/lazy-image', ['exports', 'ember', 'ember-lazy-image/components/lazy-image'], function (exports, _ember, _emberLazyImageComponentsLazyImage) {
  exports['default'] = _emberLazyImageComponentsLazyImage['default'].extend({
    viewportOptionsOverride: _ember['default'].on('didInsertElement', function () {
      _ember['default'].setProperties(this, {
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
    })
  });
});
define('criticarq-client/components/social-widget', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      var text = this.get('text');
      this.$().jsSocials({
        shares: ['email', 'twitter', 'facebook', 'linkedin', 'whatsapp'],
        text: text
      });
    }
  });
});
define('criticarq-client/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('criticarq-client/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('criticarq-client/helpers/contributors-names', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports.contributorsNames = contributorsNames;

  function contributorsNames(_ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var contributors = _ref2[0];

    var sumNames = '';
    contributors.forEach(function (contributor, i) {
      sumNames += contributor.get('contributorName');
      if (i < contributors.get('length') - 1) {
        sumNames += ' + ';
      }
    });
    return sumNames;
  }

  exports['default'] = _ember['default'].Helper.helper(contributorsNames);
});
define('criticarq-client/helpers/page-title', ['exports', 'ember-page-title/helpers/page-title'], function (exports, _emberPageTitleHelpersPageTitle) {
  exports['default'] = _emberPageTitleHelpersPageTitle['default'];
});
define('criticarq-client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('criticarq-client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('criticarq-client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'criticarq-client/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _criticarqClientConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_criticarqClientConfigEnvironment['default'].APP.name, _criticarqClientConfigEnvironment['default'].APP.version)
  };
});
define('criticarq-client/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('criticarq-client/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('criticarq-client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('criticarq-client/initializers/export-application-global', ['exports', 'ember', 'criticarq-client/config/environment'], function (exports, _ember, _criticarqClientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_criticarqClientConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _criticarqClientConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_criticarqClientConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('criticarq-client/initializers/hide-loading-screen', ['exports', 'criticarq-client/instance-initializers/hide-loading-screen', 'ember'], function (exports, _criticarqClientInstanceInitializersHideLoadingScreen, _ember) {
  exports.initialize = initialize;

  var EMBER_VERSION_REGEX = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:(?:\-(alpha|beta)\.([0-9]+)(?:\.([0-9]+))?)?)?(?:\+(canary))?(?:\.([0-9abcdef]+))?(?:\-([A-Za-z0-9\.\-]+))?(?:\+([A-Za-z0-9\.\-]+))?$/;

  /**
   * VERSION_INFO[i] is as follows:
   *
   * 0  complete version string
   * 1  major version
   * 2  minor version
   * 3  trivial version
   * 4  pre-release type (optional: "alpha" or "beta" or undefined for stable releases)
   * 5  pre-release version (optional)
   * 6  pre-release sub-version (optional)
   * 7  canary (optional: "canary", or undefined for stable releases)
   * 8  SHA (optional)
   */
  var VERSION_INFO = EMBER_VERSION_REGEX.exec(_ember['default'].VERSION);
  var isPre111 = parseInt(VERSION_INFO[1], 10) < 2 && parseInt(VERSION_INFO[2], 10) < 12;

  function initialize() {
    if (isPre111) {
      var registry = arguments[0];
      var application = arguments[1];
      _criticarqClientInstanceInitializersHideLoadingScreen['default'].initialize(registry, application);
    }
  }

  exports['default'] = {
    name: 'hide-loading-screen',
    initialize: initialize
  };
});
define('criticarq-client/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('criticarq-client/initializers/metrics', ['exports', 'criticarq-client/config/environment'], function (exports, _criticarqClientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    var _config$metricsAdapters = _criticarqClientConfigEnvironment['default'].metricsAdapters;
    var metricsAdapters = _config$metricsAdapters === undefined ? [] : _config$metricsAdapters;
    var _config$environment = _criticarqClientConfigEnvironment['default'].environment;
    var environment = _config$environment === undefined ? 'development' : _config$environment;

    var options = { metricsAdapters: metricsAdapters, environment: environment };

    application.register('config:metrics', options, { instantiate: false });
    application.inject('service:metrics', 'options', 'config:metrics');
  }

  exports['default'] = {
    name: 'metrics',
    initialize: initialize
  };
});
define('criticarq-client/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('criticarq-client/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('criticarq-client/initializers/viewport-config', ['exports', 'ember', 'criticarq-client/config/environment', 'ember-in-viewport/utils/can-use-dom'], function (exports, _ember, _criticarqClientConfigEnvironment, _emberInViewportUtilsCanUseDom) {
  exports.initialize = initialize;

  var defaultConfig = {
    viewportSpy: false,
    viewportScrollSensitivity: 1,
    viewportRefreshRate: 100,
    viewportListeners: [{ context: window, event: 'scroll.scrollable' }, { context: window, event: 'resize.resizable' }],
    viewportTolerance: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  };

  if (_emberInViewportUtilsCanUseDom['default']) {
    defaultConfig.viewportListeners.push({
      context: document,
      event: 'touchmove.scrollable'
    });
  }

  var merge = _ember['default'].merge;

  function initialize() {
    var application = arguments[1] || arguments[0];
    var _config$viewportConfig = _criticarqClientConfigEnvironment['default'].viewportConfig;
    var viewportConfig = _config$viewportConfig === undefined ? {} : _config$viewportConfig;

    var mergedConfig = merge(defaultConfig, viewportConfig);

    application.register('config:in-viewport', mergedConfig, { instantiate: false });
  }

  exports['default'] = {
    name: 'viewport-config',
    initialize: initialize
  };
});
define("criticarq-client/instance-initializers/browser/clear-double-boot", ["exports"], function (exports) {
  /*globals Ember*/

  // When using `ember fastboot --serve-assets` the application output will
  // already be rendered to the DOM when the actual JavaScript loads. Ember
  // does not automatically clear its `rootElement` so this leads to the
  // "double" applications being visible at once (only the "bottom" one is
  // running via JS and is interactive).
  //
  // This removes any pre-rendered ember-view elements, so that the booting
  // application will replace the pre-rendered output

  exports["default"] = {
    name: "clear-double-boot",

    initialize: function initialize(instance) {
      var originalDidCreateRootView = instance.didCreateRootView;

      instance.didCreateRootView = function () {
        Ember.$(instance.rootElement + ' .ember-view').remove();

        originalDidCreateRootView.apply(instance, arguments);
      };
    }
  };
});
define('criticarq-client/instance-initializers/browser/head', ['exports', 'ember', 'criticarq-client/config/environment'], function (exports, _ember, _criticarqClientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize(instance) {
    if (_criticarqClientConfigEnvironment['default']['ember-cli-head'] && _criticarqClientConfigEnvironment['default']['ember-cli-head']['suppressBrowserRender']) {
      return true;
    }

    // clear fast booted head (if any)
    _ember['default'].$('meta[name="ember-cli-head-start"]').nextUntil('meta[name="ember-cli-head-end"] ~').addBack().remove();
    var container = instance.lookup ? instance : instance.container;
    // const renderer = container.lookup('renderer:-dom');
    var component = container.lookup('component:head-layout');
    component.appendTo(document.head);
  }

  exports['default'] = {
    name: 'head-browser',
    initialize: initialize
  };
});
define("criticarq-client/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('criticarq-client/instance-initializers/hide-loading-screen', ['exports', 'criticarq-client/config/environment'], function (exports, _criticarqClientConfigEnvironment) {
  exports.initialize = initialize;

  var userConfig = _criticarqClientConfigEnvironment['default']['ember-load'] || {};

  function initialize() {
    var instance = arguments[1] || arguments[0];
    var container = !!arguments[1] ? arguments[0] : instance.container;

    if (Ember.View) {
      var ApplicationView = container.lookupFactory ? container.lookupFactory('view:application') : instance.resolveRegistration('view:application');

      ApplicationView = ApplicationView.reopen({
        didInsertElement: function didInsertElement() {
          this._super.apply(this, arguments);

          var loadingIndicatorClass = userConfig.loadingIndicatorClass || 'ember-load-indicator';

          Ember.$('.' + loadingIndicatorClass).remove();
        }
      });
    }
  }

  exports['default'] = {
    name: 'hide-loading-screen-instance',
    initialize: initialize
  };
});
define('criticarq-client/mixins/reset-scroll-top', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Mixin.create({
    beforeModel: function beforeModel() {
      this._super.apply(this, arguments);
      window.scrollTo(0, 0);
    }
  });
});
define('criticarq-client/models/article', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data/relationships'], function (exports, _emberDataModel, _emberDataAttr, _emberDataRelationships) {
  exports['default'] = _emberDataModel['default'].extend({
    title: (0, _emberDataAttr['default'])('string'),
    content: (0, _emberDataAttr['default'])('string'),
    excerpt: (0, _emberDataAttr['default'])('string'),
    slug: (0, _emberDataAttr['default'])('string'),
    socialText: (0, _emberDataAttr['default'])('string'),

    featured: (0, _emberDataAttr['default'])(),

    contributors: (0, _emberDataRelationships.hasMany)(),
    categories: (0, _emberDataRelationships.hasMany)(),
    related: (0, _emberDataRelationships.hasMany)('article', { inverse: null })
  });
});
define('criticarq-client/models/author', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({});
});
define('criticarq-client/models/category', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string'),
    slug: (0, _emberDataAttr['default'])('string')
  });
});
define('criticarq-client/models/contributor', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    contributorName: (0, _emberDataAttr['default'])('string'),
    contributorBio: (0, _emberDataAttr['default'])('string'),
    contributorImage: (0, _emberDataAttr['default'])()
  });
});
define('criticarq-client/models/tag', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({});
});
define('criticarq-client/models/taxonomy', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({});
});
define('criticarq-client/models/user', ['exports', 'ember-data/model'], function (exports, _emberDataModel) {
  exports['default'] = _emberDataModel['default'].extend({});
});
define('criticarq-client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('criticarq-client/router', ['exports', 'ember', 'criticarq-client/config/environment'], function (exports, _ember, _criticarqClientConfigEnvironment) {
  var service = _ember['default'].inject.service;

  var Router = _ember['default'].Router.extend({
    location: _criticarqClientConfigEnvironment['default'].locationType,

    metrics: service(),

    didTransition: function didTransition() {
      this._super.apply(this, arguments);
      this._trackPage();
    },

    _trackPage: function _trackPage() {
      var _this = this;

      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        var page = document.location.pathname;
        var title = _this.getWithDefault('currentRouteName', 'unknown');

        _ember['default'].get(_this, 'metrics').trackPage({ page: page, title: title });
      });
    }
  });

  Router.map(function () {
    this.route('articles', { path: 'articulos' }, function () {
      this.route('category', { path: ':category_slug' }, function () {
        this.route('article', { path: ':article_slug' }, function () {
          this.route('category');
        });
      });
    });
    this.route('home', { path: 'portada' });
  });

  exports['default'] = Router;
});
define('criticarq-client/routes/application', ['exports', 'ember'], function (exports, _ember) {
  var RSVP = _ember['default'].RSVP;
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend({
    model: function model() {
      var categories = this.store.findAll('category').then(function (loadedCategories) {
        return loadedCategories.filter(function (category) {
          return category.get('slug') !== 'uncategorized';
        });
      });

      return RSVP.hash({
        categories: categories
      });
    },
    actions: {
      useHomeNav: function useHomeNav(value) {
        this.set('controller.useHomeNav', value);
      }
    }
  });
});
define('criticarq-client/routes/articles/category/article', ['exports', 'ember', 'criticarq-client/mixins/reset-scroll-top'], function (exports, _ember, _criticarqClientMixinsResetScrollTop) {
  var get = _ember['default'].get;
  var RSVP = _ember['default'].RSVP;
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend(_criticarqClientMixinsResetScrollTop['default'], {
    model: function model(params) {
      var _modelFor = this.modelFor('articles.category');

      var category = _modelFor.category;

      var filter = {
        slug: params.article_slug
      };
      var article = this.store.query('article', {
        filter: filter
      }).then(function (articles) {
        return get(articles, 'firstObject');
      });

      return RSVP.hash({
        article: article,
        category: category
      });
    },

    afterModel: function afterModel(model) {
      var categorySlug = get(model, 'category.slug');
      var articleCategorySlug = get(model, 'article.categories.firstObject.slug');

      if (categorySlug !== articleCategorySlug) {
        var articleSlug = get(model, 'article.slug');
        return this.transitionTo('articles.category.article', categorySlug, articleSlug);
      }
    }
  });
});
define('criticarq-client/routes/articles/category/index', ['exports', 'ember'], function (exports, _ember) {
  var get = _ember['default'].get;
  var RSVP = _ember['default'].RSVP;
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend({
    model: function model(params) {
      var _modelFor = this.modelFor('articles.category');

      var category = _modelFor.category;

      var articles = this.store.query('article', {
        filter: {
          category_name: get(category, 'slug')
        }
      });

      return RSVP.hash({
        category: category,
        articles: articles
      });
    }
  });
});
define('criticarq-client/routes/articles/category', ['exports', 'ember', 'criticarq-client/mixins/reset-scroll-top'], function (exports, _ember, _criticarqClientMixinsResetScrollTop) {
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend(_criticarqClientMixinsResetScrollTop['default'], {
    model: function model(params) {
      var category = this.store.peekAll('category').findBy('slug', params.category_slug);

      return {
        category: category
      };
    }
  });
});
define('criticarq-client/routes/articles/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.transitionTo('home');
    }
  });
});
define('criticarq-client/routes/articles', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('criticarq-client/routes/home', ['exports', 'ember', 'criticarq-client/mixins/reset-scroll-top'], function (exports, _ember, _criticarqClientMixinsResetScrollTop) {
  var RSVP = _ember['default'].RSVP;
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend(_criticarqClientMixinsResetScrollTop['default'], {
    activate: function activate() {
      this.send('useHomeNav', true);
    },
    deactivate: function deactivate() {
      this.send('useHomeNav', false);
    },
    model: function model() {
      var filter = {
        tag: 'home'
      };
      var articles = this.store.query('article', {
        filter: filter
      });

      return RSVP.hash({
        articles: articles
      });
    }
  });
});
define('criticarq-client/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.transitionTo('home');
    }
  });
});
define('criticarq-client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('criticarq-client/services/document-title-list', ['exports', 'ember-page-title/services/page-title-list'], function (exports, _emberPageTitleServicesPageTitleList) {
  exports['default'] = _emberPageTitleServicesPageTitleList['default'];
});
define('criticarq-client/services/ember-load-config', ['exports', 'ember-load/services/ember-load-config', 'criticarq-client/config/environment'], function (exports, _emberLoadServicesEmberLoadConfig, _criticarqClientConfigEnvironment) {
  var userConfig = _criticarqClientConfigEnvironment['default']['ember-load'] || {};

  exports['default'] = _emberLoadServicesEmberLoadConfig['default'].extend({
    loadingIndicatorClass: userConfig.loadingIndicatorClass
  });
});
define('criticarq-client/services/fastboot', ['exports', 'ember'], function (exports, _ember) {

  var alias = _ember['default'].computed.alias;
  var computed = _ember['default'].computed;

  exports['default'] = _ember['default'].Service.extend({
    cookies: alias('_fastbootInfo.cookies'),
    headers: alias('_fastbootInfo.headers'),
    host: computed(function () {
      return this._fastbootInfo.host();
    }),
    isFastBoot: computed(function () {
      return typeof FastBoot !== 'undefined';
    })
  });
});
/* global FastBoot */
define('criticarq-client/services/head-data', ['exports', 'ember-cli-head/services/head-data'], function (exports, _emberCliHeadServicesHeadData) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliHeadServicesHeadData['default'];
    }
  });
});
define('criticarq-client/services/metrics', ['exports', 'ember-metrics/services/metrics'], function (exports, _emberMetricsServicesMetrics) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMetricsServicesMetrics['default'];
    }
  });
});
define('criticarq-client/services/page-title-list', ['exports', 'ember-page-title/services/page-title-list'], function (exports, _emberPageTitleServicesPageTitleList) {
  exports['default'] = _emberPageTitleServicesPageTitleList['default'];
});
define("criticarq-client/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 4
            },
            "end": {
              "line": 11,
              "column": 4
            }
          },
          "moduleName": "criticarq-client/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      Inicio\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 6
              },
              "end": {
                "line": 15,
                "column": 6
              }
            },
            "moduleName": "criticarq-client/templates/application.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "category.name", ["loc", [null, [14, 8], [14, 25]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 12,
              "column": 4
            },
            "end": {
              "line": 16,
              "column": 4
            }
          },
          "moduleName": "criticarq-client/templates/application.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["articles.category", ["get", "category.slug", ["loc", [null, [13, 37], [13, 50]]]]], ["activeClass", ["subexpr", "@mut", [["get", "category.slug", ["loc", [null, [13, 63], [13, 76]]]]], [], []]], 0, null, ["loc", [null, [13, 6], [15, 18]]]]],
        locals: ["category"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        dom.setAttribute(el1, "class", "site-footer");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("nav");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        dom.setAttribute(el2, "class", "copyright");
        var el3 = dom.createTextNode("\n    © 2016 CRITICarq.gt\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [6, 1]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(element0, 1, 1);
        morphs[4] = dom.createMorphAt(element0, 2, 2);
        morphs[5] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "page-title", ["CRITICarq"], ["prepend", true, "separator", " \\ "], ["loc", [null, [1, 0], [1, 50]]]], ["inline", "app-nav", [], ["fixed", true, "categories", ["subexpr", "@mut", [["get", "model.categories", ["loc", [null, [3, 32], [3, 48]]]]], [], []], "useHomeNav", ["subexpr", "@mut", [["get", "useHomeNav", ["loc", [null, [3, 60], [3, 70]]]]], [], []]], ["loc", [null, [3, 0], [3, 72]]]], ["content", "outlet", ["loc", [null, [5, 0], [5, 10]]]], ["block", "link-to", ["home"], [], 0, null, ["loc", [null, [9, 4], [11, 16]]]], ["block", "each", [["get", "model.categories", ["loc", [null, [12, 12], [12, 28]]]]], [], 1, null, ["loc", [null, [12, 4], [16, 13]]]], ["content", "ember-load-remover", ["loc", [null, [23, 0], [23, 22]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("criticarq-client/templates/articles/category/article", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/articles/category/article.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "contributor-bio", [], ["contributor", ["subexpr", "@mut", [["get", "contributor", ["loc", [null, [6, 32], [6, 43]]]]], [], []]], ["loc", [null, [6, 2], [6, 45]]]]],
        locals: ["contributor"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 4
            },
            "end": {
              "line": 20,
              "column": 4
            }
          },
          "moduleName": "criticarq-client/templates/articles/category/article.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "article-tile", [], ["article", ["subexpr", "@mut", [["get", "article", ["loc", [null, [19, 29], [19, 36]]]]], [], []]], ["loc", [null, [19, 6], [19, 38]]]]],
        locals: ["article"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/articles/category/article.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "article-comments");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "article-disquss");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Únete a la discusión");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1, "class", "suggested-articles");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "articles-tiles-grid");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [6, 1]), 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [8, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "page-title", [["get", "model.article.title", ["loc", [null, [1, 8], [1, 27]]]]], [], ["loc", [null, [1, 0], [1, 29]]]], ["inline", "article-single", [], ["article", ["subexpr", "@mut", [["get", "model.article", ["loc", [null, [3, 25], [3, 38]]]]], [], []], "category", ["subexpr", "@mut", [["get", "model.category", ["loc", [null, [3, 48], [3, 62]]]]], [], []]], ["loc", [null, [3, 0], [3, 64]]]], ["block", "each", [["get", "model.article.contributors", ["loc", [null, [5, 8], [5, 34]]]]], [], 0, null, ["loc", [null, [5, 0], [7, 9]]]], ["inline", "disqus-comments", [], ["identifier", ["subexpr", "@mut", [["get", "model.article.slug", ["loc", [null, [12, 33], [12, 51]]]]], [], []]], ["loc", [null, [12, 4], [12, 53]]]], ["block", "each", [["get", "model.article.related", ["loc", [null, [18, 12], [18, 33]]]]], [], 1, null, ["loc", [null, [18, 4], [20, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("criticarq-client/templates/articles/category/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/articles/category/index.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "article-single", [], ["article", ["subexpr", "@mut", [["get", "article", ["loc", [null, [2, 27], [2, 34]]]]], [], []], "category", ["subexpr", "@mut", [["get", "model.category", ["loc", [null, [2, 44], [2, 58]]]]], [], []], "preview", true], ["loc", [null, [2, 2], [2, 73]]]]],
        locals: ["article"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/articles/category/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model.articles", ["loc", [null, [1, 8], [1, 22]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("criticarq-client/templates/articles/category/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/articles/category/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "loading-page");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "signal-loader");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/articles/category", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/articles/category.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "page-title", [["get", "model.category.name", ["loc", [null, [1, 8], [1, 27]]]]], [], ["loc", [null, [1, 0], [1, 29]]]], ["content", "outlet", ["loc", [null, [3, 0], [3, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/articles/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/articles/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/articles/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/articles/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "loading-page");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "signal-loader");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/articles", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/articles.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/components/app-nav", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 2,
              "column": 33
            }
          },
          "moduleName": "criticarq-client/templates/components/app-nav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("CRITICarq.gt");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 4
              },
              "end": {
                "line": 8,
                "column": 4
              }
            },
            "moduleName": "criticarq-client/templates/components/app-nav.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "category.name", ["loc", [null, [7, 6], [7, 23]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 9,
              "column": 2
            }
          },
          "moduleName": "criticarq-client/templates/components/app-nav.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["articles.category", ["get", "category.slug", ["loc", [null, [6, 35], [6, 48]]]]], ["activeClass", ["subexpr", "@mut", [["get", "category.slug", ["loc", [null, [6, 61], [6, 74]]]]], [], []]], 0, null, ["loc", [null, [6, 4], [8, 16]]]]],
        locals: ["category"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/app-nav.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1, "class", "logo");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["home"], [], 0, null, ["loc", [null, [2, 2], [2, 45]]]], ["block", "each", [["get", "categories", ["loc", [null, [5, 10], [5, 20]]]]], [], 1, null, ["loc", [null, [5, 2], [9, 11]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("criticarq-client/templates/components/article-single", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 2
            },
            "end": {
              "line": 8,
              "column": 2
            }
          },
          "moduleName": "criticarq-client/templates/components/article-single.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "category-label", [], ["category", ["subexpr", "@mut", [["get", "category", ["loc", [null, [7, 30], [7, 38]]]]], [], []]], ["loc", [null, [7, 4], [7, 40]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 4
            },
            "end": {
              "line": 12,
              "column": 4
            }
          },
          "moduleName": "criticarq-client/templates/components/article-single.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "article.title", ["loc", [null, [11, 6], [11, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 26,
              "column": 2
            }
          },
          "moduleName": "criticarq-client/templates/components/article-single.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "article-content");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createUnsafeMorphAt(dom.childAt(fragment, [3]), 1, 1);
          morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["inline", "social-widget", [], ["text", ["subexpr", "@mut", [["get", "article.socialText", ["loc", [null, [21, 25], [21, 43]]]]], [], []]], ["loc", [null, [21, 4], [21, 45]]]], ["content", "article.content", ["loc", [null, [23, 6], [23, 27]]]], ["inline", "social-widget", [], ["text", ["subexpr", "@mut", [["get", "article.socialText", ["loc", [null, [25, 25], [25, 43]]]]], [], []]], ["loc", [null, [25, 4], [25, 45]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 4
              },
              "end": {
                "line": 31,
                "column": 4
              }
            },
            "moduleName": "criticarq-client/templates/components/article-single.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      Seguir leyendo »\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 2
            },
            "end": {
              "line": 32,
              "column": 2
            }
          },
          "moduleName": "criticarq-client/templates/components/article-single.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", ["articles.category.article", ["get", "article.slug", ["loc", [null, [29, 43], [29, 55]]]]], ["class", "read-more"], 0, null, ["loc", [null, [29, 4], [31, 16]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/article-single.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("article");
        dom.setAttribute(el1, "class", "article-read");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        dom.setAttribute(el2, "class", "article-title");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        dom.setAttribute(el2, "class", "article-author");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "article-intro");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [5]), 1, 1);
        morphs[4] = dom.createUnsafeMorphAt(dom.childAt(element0, [7]), 1, 1);
        morphs[5] = dom.createMorphAt(element0, 9, 9);
        morphs[6] = dom.createMorphAt(element0, 11, 11);
        return morphs;
      },
      statements: [["inline", "lazy-image", [], ["url", ["subexpr", "@mut", [["get", "article.featured.url", ["loc", [null, [2, 19], [2, 39]]]]], [], []], "alt", ["subexpr", "@mut", [["get", "article.title", ["loc", [null, [2, 44], [2, 57]]]]], [], []]], ["loc", [null, [2, 2], [2, 59]]]], ["block", "unless", [["get", "preview", ["loc", [null, [6, 12], [6, 19]]]]], [], 0, null, ["loc", [null, [6, 2], [8, 13]]]], ["block", "link-to", ["articles.category.article", ["get", "article.slug", ["loc", [null, [10, 43], [10, 55]]]]], [], 1, null, ["loc", [null, [10, 4], [12, 16]]]], ["inline", "contributors-names", [["get", "article.contributors", ["loc", [null, [15, 25], [15, 45]]]]], [], ["loc", [null, [15, 4], [15, 47]]]], ["content", "article.excerpt", ["loc", [null, [18, 4], [18, 25]]]], ["block", "unless", [["get", "preview", ["loc", [null, [20, 12], [20, 19]]]]], [], 2, null, ["loc", [null, [20, 2], [26, 13]]]], ["block", "if", [["get", "preview", ["loc", [null, [28, 8], [28, 15]]]]], [], 3, null, ["loc", [null, [28, 2], [32, 9]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("criticarq-client/templates/components/article-tile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 7,
              "column": 2
            }
          },
          "moduleName": "criticarq-client/templates/components/article-tile.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "article.title", ["loc", [null, [6, 4], [6, 21]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/article-tile.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "image-background");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "class", "article-title");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        dom.setAttribute(el1, "class", "article-author");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'style');
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        return morphs;
      },
      statements: [["attribute", "style", ["get", "style", ["loc", [null, [1, 38], [1, 43]]]]], ["block", "link-to", ["articles.category.article", ["get", "category.slug", ["loc", [null, [5, 41], [5, 54]]]], ["get", "article.slug", ["loc", [null, [5, 55], [5, 67]]]]], [], 0, null, ["loc", [null, [5, 2], [7, 14]]]], ["inline", "contributors-names", [["get", "article.contributors", ["loc", [null, [10, 23], [10, 43]]]]], [], ["loc", [null, [10, 2], [10, 45]]]], ["inline", "category-label", [], ["category", ["subexpr", "@mut", [["get", "category", ["loc", [null, [12, 26], [12, 34]]]]], [], []]], ["loc", [null, [12, 0], [12, 36]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("criticarq-client/templates/components/category-label", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/components/category-label.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  +");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "category.name", ["loc", [null, [2, 3], [2, 20]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/category-label.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "link-to", ["articles.category", ["get", "category.slug", ["loc", [null, [1, 31], [1, 44]]]]], ["class", "category-link"], 0, null, ["loc", [null, [1, 0], [3, 12]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("criticarq-client/templates/components/contributor-bio", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/contributor-bio.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("aside");
        dom.setAttribute(el1, "class", "photo");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("img");
        dom.setAttribute(el2, "alt", "contributor.contributorName");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "content");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'src');
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
        morphs[2] = dom.createUnsafeMorphAt(dom.childAt(element1, [3]), 1, 1);
        return morphs;
      },
      statements: [["attribute", "src", ["concat", [["get", "contributor.contributorImage.thumbnail.url", ["loc", [null, [2, 14], [2, 56]]]]]]], ["content", "contributor.contributorName", ["loc", [null, [6, 4], [6, 35]]]], ["content", "contributor.contributorBio", ["loc", [null, [9, 4], [9, 36]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/components/lazy-background-image", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-background-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-error-message");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "defaultErrorText", ["loc", [null, [3, 42], [3, 62]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-background-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-placeholder");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [5, 40], [5, 49]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/components/lazy-background-image.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "errorThrown", ["loc", [null, [2, 8], [2, 19]]]]], [], 0, 1, ["loc", [null, [2, 2], [6, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 2
              },
              "end": {
                "line": 10,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-background-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-error-message");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "defaultErrorText", ["loc", [null, [9, 42], [9, 62]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 2
              },
              "end": {
                "line": 29,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-background-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-placeholder");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.setNamespace("http://www.w3.org/2000/svg");
            var el2 = dom.createElement("svg");
            dom.setAttribute(el2, "version", "1.1");
            dom.setAttribute(el2, "id", "loader-1");
            dom.setAttribute(el2, "xmlns", "http://www.w3.org/2000/svg");
            dom.setAttribute(el2, "xmlns:xlink", "http://www.w3.org/1999/xlink");
            dom.setAttribute(el2, "x", "0px");
            dom.setAttribute(el2, "y", "0px");
            dom.setAttribute(el2, "width", "40px");
            dom.setAttribute(el2, "height", "40px");
            dom.setAttribute(el2, "viewBox", "0 0 40 40");
            dom.setAttribute(el2, "enable-background", "new 0 0 40 40");
            dom.setAttributeNS(el2, "http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("path");
            dom.setAttribute(el3, "opacity", "0.2");
            dom.setAttribute(el3, "fill", "#000");
            dom.setAttribute(el3, "d", "M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\n        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\n        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("path");
            dom.setAttribute(el3, "fill", "#000");
            dom.setAttribute(el3, "d", "M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\n        C22.32,8.481,24.301,9.057,26.013,10.047z");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("animateTransform");
            dom.setAttribute(el4, "attributeType", "xml");
            dom.setAttribute(el4, "attributeName", "transform");
            dom.setAttribute(el4, "type", "rotate");
            dom.setAttribute(el4, "from", "0 20 20");
            dom.setAttribute(el4, "to", "360 20 20");
            dom.setAttribute(el4, "dur", "0.5s");
            dom.setAttribute(el4, "repeatCount", "indefinite");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 30,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/components/lazy-background-image.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "errorThrown", ["loc", [null, [8, 8], [8, 19]]]]], [], 0, 1, ["loc", [null, [8, 2], [29, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/lazy-background-image.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("img");
        dom.setAttribute(el1, "style", "display: none");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element0, 'src');
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [30, 7]]]], ["attribute", "src", ["get", "lazyUrl", ["loc", [null, [32, 33], [32, 40]]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("criticarq-client/templates/components/lazy-image", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-error-message");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "defaultErrorText", ["loc", [null, [3, 42], [3, 62]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-placeholder");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [5, 40], [5, 49]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "errorThrown", ["loc", [null, [2, 8], [2, 19]]]]], [], 0, 1, ["loc", [null, [2, 2], [6, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 2
              },
              "end": {
                "line": 10,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-error-message");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "defaultErrorText", ["loc", [null, [9, 42], [9, 62]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 2
              },
              "end": {
                "line": 29,
                "column": 2
              }
            },
            "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "lazy-image-placeholder");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.setNamespace("http://www.w3.org/2000/svg");
            var el2 = dom.createElement("svg");
            dom.setAttribute(el2, "version", "1.1");
            dom.setAttribute(el2, "id", "loader-1");
            dom.setAttribute(el2, "xmlns", "http://www.w3.org/2000/svg");
            dom.setAttribute(el2, "xmlns:xlink", "http://www.w3.org/1999/xlink");
            dom.setAttribute(el2, "x", "0px");
            dom.setAttribute(el2, "y", "0px");
            dom.setAttribute(el2, "width", "40px");
            dom.setAttribute(el2, "height", "40px");
            dom.setAttribute(el2, "viewBox", "0 0 40 40");
            dom.setAttribute(el2, "enable-background", "new 0 0 40 40");
            dom.setAttributeNS(el2, "http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("path");
            dom.setAttribute(el3, "opacity", "0.2");
            dom.setAttribute(el3, "fill", "#000");
            dom.setAttribute(el3, "d", "M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\n        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\n        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("path");
            dom.setAttribute(el3, "fill", "#000");
            dom.setAttribute(el3, "d", "M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\n        C22.32,8.481,24.301,9.057,26.013,10.047z");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("animateTransform");
            dom.setAttribute(el4, "attributeType", "xml");
            dom.setAttribute(el4, "attributeName", "transform");
            dom.setAttribute(el4, "type", "rotate");
            dom.setAttribute(el4, "from", "0 20 20");
            dom.setAttribute(el4, "to", "360 20 20");
            dom.setAttribute(el4, "dur", "0.5s");
            dom.setAttribute(el4, "repeatCount", "indefinite");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 30,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "errorThrown", ["loc", [null, [8, 8], [8, 19]]]]], [], 0, 1, ["loc", [null, [8, 2], [29, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(5);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createAttrMorph(element1, 'src');
          morphs[2] = dom.createAttrMorph(element1, 'alt');
          morphs[3] = dom.createAttrMorph(element1, 'height');
          morphs[4] = dom.createAttrMorph(element1, 'width');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["subexpr", "unbound", [["get", "class", ["loc", [null, [33, 24], [33, 29]]]]], [], ["loc", [null, [33, 14], [33, 31]]]]]]], ["attribute", "src", ["get", "lazyUrl", ["loc", [null, [33, 39], [33, 46]]]]], ["attribute", "alt", ["concat", [["subexpr", "unbound", [["get", "alt", ["loc", [null, [33, 64], [33, 67]]]]], [], ["loc", [null, [33, 54], [33, 69]]]]]]], ["attribute", "height", ["get", "height", ["loc", [null, [33, 80], [33, 86]]]]], ["attribute", "width", ["get", "width", ["loc", [null, [33, 97], [33, 102]]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 34,
              "column": 0
            },
            "end": {
              "line": 36,
              "column": 0
            }
          },
          "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'src');
          morphs[2] = dom.createAttrMorph(element0, 'alt');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["subexpr", "unbound", [["get", "class", ["loc", [null, [35, 24], [35, 29]]]]], [], ["loc", [null, [35, 14], [35, 31]]]]]]], ["attribute", "src", ["get", "lazyUrl", ["loc", [null, [35, 39], [35, 46]]]]], ["attribute", "alt", ["concat", [["subexpr", "unbound", [["get", "alt", ["loc", [null, [35, 64], [35, 67]]]]], [], ["loc", [null, [35, 54], [35, 69]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/lazy-image.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [30, 7]]]], ["block", "if", [["get", "useDimensionsAttrs", ["loc", [null, [32, 6], [32, 24]]]]], [], 2, 3, ["loc", [null, [32, 0], [36, 7]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("criticarq-client/templates/components/social-widget", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/components/social-widget.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/head", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/head.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" `app/templates/head.hbs` ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" content from ember-page-title, injected by ember-cli-head ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" The 'model' available in this template can be populated by ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" setting values on the 'head-data' service. ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("title");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 0, 0);
        return morphs;
      },
      statements: [["content", "model.title", ["loc", [null, [5, 7], [5, 22]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 2
            }
          },
          "moduleName": "criticarq-client/templates/home.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "article-tile", [], ["article", ["subexpr", "@mut", [["get", "article", ["loc", [null, [3, 27], [3, 34]]]]], [], []]], ["loc", [null, [3, 4], [3, 36]]]]],
        locals: ["article"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/home.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "articles-tiles-grid home-tiles");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model.articles", ["loc", [null, [2, 10], [2, 24]]]]], [], 0, null, ["loc", [null, [2, 2], [4, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("criticarq-client/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("criticarq-client/templates/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "criticarq-client/templates/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "loading-page");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "signal-loader");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define('criticarq-client/utils/can-use-dom', ['exports', 'ember-metrics/utils/can-use-dom'], function (exports, _emberMetricsUtilsCanUseDom) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMetricsUtilsCanUseDom['default'];
    }
  });
});
define('criticarq-client/utils/disqus-cache', ['exports', 'ember-disqus/utils/disqus-cache'], function (exports, _emberDisqusUtilsDisqusCache) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusUtilsDisqusCache['default'];
    }
  });
});
define('criticarq-client/utils/load-disqus-api', ['exports', 'ember-disqus/utils/load-filepicker-api'], function (exports, _emberDisqusUtilsLoadFilepickerApi) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusUtilsLoadFilepickerApi['default'];
    }
  });
});
define('criticarq-client/utils/object-transforms', ['exports', 'ember-metrics/utils/object-transforms'], function (exports, _emberMetricsUtilsObjectTransforms) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMetricsUtilsObjectTransforms['default'];
    }
  });
});
define('criticarq-client/views/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('criticarq-client/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"criticarq-client","environment":"development","baseURL":"/","locationType":"auto","disqus":{"shortname":"criticarq"},"EmberENV":{"FEATURES":{}},"APP":{"name":"criticarq-client","version":"0.0.0+d4fa0129"},"apiHost":"http://content.criticarq.gt","metricsAdapters":[{"name":"GoogleAnalytics","environments":["development"],"config":{"id":"UA-44116271-3"}}],"something":"test","exportApplicationGlobal":true,"ember-load":{"loadingIndicatorClass":"ember-load-indicator"}}};
});

/* jshint ignore:end */

/* jshint ignore:start */
if (!runningTests) {
  require("criticarq-client/app")["default"].create({"name":"criticarq-client","version":"0.0.0+d4fa0129"});
}

define('~fastboot/app-factory', ['criticarq-client/app', 'criticarq-client/config/environment'], function(App, config) {
  App = App['default'];
  config = config['default'];

  return {
    'default': function() {
      return App.create(config.APP);
    }
  };
});

/* jshint ignore:end */
//# sourceMappingURL=criticarq-client.map