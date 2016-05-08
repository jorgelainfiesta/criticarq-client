/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      prepend: 'http://assets.criticarq.gt/'
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/jssocials/dist/jssocials.js');
  app.import('bower_components/jssocials/dist/jssocials.css');
  app.import('bower_components/jssocials/dist/jssocials-theme-minima.css');

  // app.import({
  //   development: 'bower_components/font-awesome/css/font-awesome.css',
  //   production:  'bower_components/font-awesome/css/font-awesome.min.css'
  // });

  // [
  //   'FontAwesome.otf',
  //   'fontawesome-webfont.svg',
  //   'fontawesome-webfont.woff',
  //   'fontawesome-webfont.eot',
  //   'fontawesome-webfont.ttf',
  //   'fontawesome-webfont.woff2'
  // ].forEach(function(font) {
  //   var file = 'bower_components/font-awesome/fonts/' + font;
  //   app.import(file, { destDir: 'fonts' });
  // });

  return app.toTree();
};
