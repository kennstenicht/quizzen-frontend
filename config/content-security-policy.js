module.exports = function() {
  return {
    delivery: ['header'],
    enabled: false,
    failTests: true,
    policy: {
      'default-src':  ["'none'"],
      'script-src':   ["'self'", "'unsafe-eval'", "test"],
      'font-src':     ["'self'"],
      'connect-src':  ["'self'", "http://localhost:3000"],
      'img-src':      ["'self'"],
      'style-src':    ["'self'"],
      'media-src':    ["'self'"],
    },
    reportOnly: true,
  };
}
