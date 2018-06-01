
import Vue from 'vue'
import VueAppInsights from 'vue-application-insights'

export default async function ({ app: { router } }) {
  const moduleOptions = <%= serialize(options) %>
  Vue.use(VueAppInsights, Object.assign({ router }, moduleOptions))
}
