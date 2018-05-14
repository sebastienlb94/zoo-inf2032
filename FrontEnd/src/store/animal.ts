export const state = () => ({
  animals: []
});

export const mutations = {
  set(state, animals) {
    state.animals = animals;
  },
  add(state, animal) {
    state.animals.push(animal);
  },
  remove(state, { animal }) {
    state.animals.splice(state.animals.indexOf(animal), 1);
  }
};

export const actions = {
  async getAnimals({ commit }) {
    const animals = await this.$axios.$get('http://localhost:3000/animals');
    commit('set', animals);
  }
};
