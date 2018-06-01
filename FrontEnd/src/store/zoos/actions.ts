import axios from 'axios';
import { ActionTree } from 'vuex';

import config from '../../config.js';

import { State } from './types';
import { RootState } from '../types';

const zoosEndpoint = `${config.API_URL}/zoos`;

export const actions: ActionTree<State, RootState> = {
  getZoos: ({ commit }) => new Promise((resolve, reject) => {
    axios.get(`${zoosEndpoint}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  getZoo: ({ commit }, id) => new Promise((resolve, reject) => {
    axios.get(`${zoosEndpoint}/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  })
};
