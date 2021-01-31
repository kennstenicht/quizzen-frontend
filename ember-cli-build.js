'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const sass = require('node-sass');
const eyeglass = require('eyeglass');
const { adaptor, adaptorSync } = require('@css-blocks/eyeglass');
const path = require('path');

const sassOptions = {
  outputStyle: "expanded",
  includePaths: ['app/styles', 'node_modules'],
};

const scss = adaptor(sass, eyeglass, sassOptions);
const scssSync = adaptorSync(sass, eyeglass, sassOptions);

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'css-blocks': {
      aliases: {
        objects: path.resolve(__dirname, 'app/styles/objects')
      },
      parserOpts: {
        outputMode: 'BEM',
        preprocessors: {
          scss
        },
        preprocessorsSync: {
          scss: scssSync
        }
      }
    },
    sassOptions
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

  return app.toTree();
};
