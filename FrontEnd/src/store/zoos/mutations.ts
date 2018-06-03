import { MutationTree } from 'vuex';
import { State } from './types';

export const mutations: MutationTree<State> = {
  search(state, search) {
    state.search = search;
  }
};
