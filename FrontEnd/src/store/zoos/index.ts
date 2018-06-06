import { Module } from 'vuex';

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

import { State } from './types';
import { RootState } from '../types';

export const state: State = {
  search: ''
};

const namespaced: boolean = true;

export const Zoos: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
