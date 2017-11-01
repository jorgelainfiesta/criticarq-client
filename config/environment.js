/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'criticarq-client',
    environment: environment,
    locationType: 'auto',
    rootURL: '/',
    disqus: {
      shortname: 'criticarq'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    apiHost: 'http://content.criticarq.gt',
    moment: {
      includeLocales: ['es']
    },
    fastboot: {
      hostWhitelist: ['criticarq.gt', /^localhost:\d+$/]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.metricsAdapters = [
      {
        name: 'GoogleAnalytics',
        environments: ['development'],
        config: {
          id: 'UA-44116271-3'
        }
      }
    ];
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.metricsAdapters = [
      {
        name: 'GoogleAnalytics',
        environments: ['production'],
        config: {
          id: 'UA-77428422-1'
        }
      }
    ];
  }

  return ENV;
};
