'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const sass = require('node-sass');
const eyeglass = require('eyeglass');

function scssPreprocessor(file, data, _configuration, _sourceMap) {
  return new Promise((resolve, reject) => {
    const sassOptions = {
      file,
      data,
      outputStyle: 'expanded',
      sourceMap: true,
      outFile: file,
      eyeglass: {},
    };
    sass.render(eyeglass(sassOptions), (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          content: res.css.toString(),
          sourceMap: res.map.toString(),
          dependencies: [],
        })
      }
    });
  })
}

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'css-blocks': {
      parserOpts: {
        preprocessors: {
          scss: scssPreprocessor
         }
      }
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

  return app.toTree();
};
