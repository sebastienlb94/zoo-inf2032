const pkg = require('./package.json');
const { resolve } = require('path');

module.exports = {
  mode: 'spa',

  srcDir: './src',
  dir: {
    static: '../static'
  },

  /* Headers of the page */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/png', size: '512x512', href: '/icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800' }
    ]
  },

  /* Customize the progress-bar color */
  loading: { color: '#FFFFFF' },

  /* Plugins to load before mounting the App */
  plugins: [
    '~/plugins/bootstrap.ts' // For register all global directives, filters or components.
  ],

  /* Nuxt.js modules */
  modules: [
    '@nuxtjs/axios', // Doc: https://axios.nuxtjs.org/
    '@nuxtjs/pwa', // Doc: https://pwa.nuxtjs.org/
    'qonfucius-nuxt-fontawesome', // Doc: https://github.com/Qonfucius/nuxt-fontawesome/
    '~/modules/typescript.ts',

    /* Monitoring */
    '~/modules/analytics',
    '~/modules/app-insights'
  ],

  env: {
    analyticsId: process.env.ANALYTICS_ID, // For google analytics

    instrumentationKey: process.env.INSTRUMENTATION_KEY, // For application insights

    API_URL: 'https://zoo-inf2032.herokuapp.com',
    FRONT_URL: 'https://zoo-inf2032.firebaseapp.com'
  },

  /* Extend option for vue-analytics, see https://matteogabriele.gitbooks.io/vue-analytics/content */
  'google-analytics': {},

  'fontAwesome': {
    componentName: 'icon',
    packs: [
      { package: '@fortawesome/fontawesome-pro-solid' },
      { package: '@fortawesome/fontawesome-pro-regular' },
      { package: '@fortawesome/fontawesome-pro-light' },
      { package: '@fortawesome/fontawesome-free-brands' }
    ]
  },

  generate: {
    fallback: false
  },

  /* Build configuration */
  build: {

    filenames: {
      chunk: '[id].[chunkhash].js'
    },

    extend: (config, ctx) => {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }

      // Load gloabll scss variable
      const isVueRule = rule =>
        rule.test.toString() === '/\\.vue$/';
      const isSASSRule = rule =>
        ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1;

      const scssLoader = {
        loader: 'sass-resources-loader',
        options: {
          resources: resolve(__dirname, 'src/styles/theme.scss')
        }
      };

      config.module.rules.forEach((rule) => {
        if (isVueRule(rule)) {
          rule.options.loaders.scss.push(scssLoader);
        }
        if (isSASSRule(rule)) {
          rule.use.push(scssLoader);
        }
      });
    }

  },

  workbox: {
    swDest: resolve(__dirname, 'static', 'sw.js')
  },

  icon: {
    iconSrc: resolve(__dirname, 'static', 'icon.png')
  }

};
