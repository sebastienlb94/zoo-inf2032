import axios from 'axios';
import { ActionTree } from 'vuex';

import { State } from './types';
import { RootState } from '../types';

const zoosEndpoint = `${process.env.API_URL}/zoos`;

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
  getZoo: ({ commit }, zooId) => new Promise((resolve, reject) => {
    axios.get(`${zoosEndpoint}/${zooId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  createEnclosure: ({ commit }, { zooId, name }) => new Promise((resolve, reject) => {
    axios.post(`${zoosEndpoint}/${zooId}`, { 'name': name })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  editEnclosure: ({ commit }, { zooId, enclosure }) => new Promise((resolve, reject) => {
    axios.put(`${zoosEndpoint}/${zooId}/${enclosure.id}`, { 'enclosure': enclosure })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  deleteEnclosure: ({ commit }, { zooId, enclosure }) => new Promise((resolve, reject) => {
    axios.delete(`${zoosEndpoint}/${zooId}/${enclosure.id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  addAnimal: ({ commit }, { zooId, enclosure, animal }) => new Promise((resolve, reject) => {
    axios.post(`${zoosEndpoint}/${zooId}/${enclosure.id}`, { 'animal': animal })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  }),
  deleteAnimal: ({ commit }, { zooId, enclosure, animal }) => new Promise((resolve, reject) => {
    axios.delete(`${zoosEndpoint}/${zooId}/${enclosure.id}/${animal.id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  })
};
