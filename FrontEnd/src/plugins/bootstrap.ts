import Vue from 'vue';
import VeeValidate from 'vee-validate';

import clickout from './directives/clickoutside';

/*
  Register directives
*/
Vue.directive('clickout', clickout);

/*
  Register plugins
*/
Vue.use(VeeValidate);
