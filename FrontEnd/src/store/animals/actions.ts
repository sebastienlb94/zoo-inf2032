import axios from 'axios';
import { ActionTree } from 'vuex';

import { State } from './types';
import { RootState } from '../types';

const animalsEndpoint = `${process.env.API_URL}/animals`;

export const actions: ActionTree<State, RootState> = {
  getAnimals: ({ commit }) => new Promise((resolve, reject) => {
    axios.get(`${animalsEndpoint}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  getAnimal: ({ commit }, id) => new Promise((resolve, reject) => {
    axios.get(`${animalsEndpoint}/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  })
};
