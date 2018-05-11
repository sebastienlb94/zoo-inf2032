const { resolve } = require('path');

module.exports = function module(moduleOptions) {
  const options = this.options['google-analytics'] || moduleOptions;

  if (this.options.dev) return;

  // see https://github.com/nuxt-community/analytics-module/issues/2
  if (options.ua) {
    options.id = options.ua;
    delete options.ua;
  }

  const { analyticsId } = this.options.env;

  if (analyticsId) {
    options.id = analyticsId;
  }

  if (!options.id) {
    console.warn('[Analytics] `ANALYTICS_ID` not defined');
    return;
  }

  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    fileName: 'google-analytics.js',
    options,
    ssr: false
  });
};
