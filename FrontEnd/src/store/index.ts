import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { RootState } from './types';
import { Animals } from './animals';
import { Zoos } from './zoos';

const debug: boolean = process.env.NODE_ENV !== 'production';

const createStore = () => {
  return new Store<RootState>({
    state: {
      version: '1.0.0'
    },

    modules: { Animals, Zoos },
    strict: debug
  });
};

export default createStore;
