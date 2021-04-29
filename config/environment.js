'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'quizzen',
    podModulePrefix: 'quizzen/routes',
    environment,
    rootURL: '/',
    locationType: 'auto',

    company: {
      name: 'quizzen.jetzt',
      twitter: '@quizzen'
    },

    'changeset-validations': {
      rawOutput: true
    },

    'ember-simple-auth': {
      routeAfterAuthentication: 'profile.quizzes'
    },

    'ember-simple-auth-token': {
      serverTokenEndpoint: 'http://localhost:3000/v1/user_token',
      tokenPropertyName: 'jwt',
      refreshAccessTokens: false,
      tokenExpirationInvalidateSession: true,
      tokenExpireName: 'exp'
    },

    emberKeyboard: {
      disableInputsInitializer: true
    },

    fastboot: {
      hostWhitelist: ['staging.quizzen.jetzt','quizzen.jetzt', 'quizzen.herokuapp.com', /^localhost:\d+$/, /^192.*:\d+$/]
    },

    flashMessageDefaults: {
      timeout: 4000,
      extendedTimeout: 2000
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      host: 'http://localhost:3000',
      cableUrl: 'ws://localhost:3000/cable'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    const protocol = 'https://';
    const host = 'quizzen-api.herokuapp.com';

    ENV.APP.host = `${protocol}${host}`;
    ENV.APP.cableUrl = `ws://${host}/cable`;

    ENV['ember-simple-auth-token']['serverTokenEndpoint'] =  `${protocol}${host}/v1/user_token`;
  }

  return ENV;
};
