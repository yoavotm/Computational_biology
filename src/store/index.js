import { createStore } from "vuex";
//import axios from "axios";

export default createStore({
  state: {
    // the width of the board
    width: 0,
    // the height of the board
    height: 0,
    // the number of iterations in the simulation
    iterations: 0,
    // the number of iterations that a human doesnt pass the rumer after he passes it
    L: 0,
    // the board and the previous board
    boards: {
      current: [],
      last: [],
    },
    // the number of humans in the simulation
    P: 0,
    // the probability distribution of the 4 states for a human - S1, S2, S3, S4 - in the following order
    distrabution: [0.25, 0.25, 0.25, 0.25],
  },
  getters: {
    getWidth: (state) => state.width,
    getHeight: (state) => state.height,
    getIterations: (state) => state.iterations,
    getL: (state) => state.L,
    getBoards: (state) => state.boards,
    getP: (state) => state.P,
    getDistrabution: (state) => state.distrabution,
  },
  mutations: {
    setWidth: (state, width) => (state.width = width),
    setHeight: (state, height) => (state.height = height),
    setIterations: (state, iterations) => (state.iterations = iterations),
    setL: (state, L) => (state.L = L),
    setBoards: (state, boards) => (state.boards = boards),
    setP: (state, P) => (state.P = P),
    setDistrabution: (state, distrabution) =>
      (state.distrabution = distrabution),
  },

  actions: {
    updateWidth({ commit }, int) {
      commit("setWidth", int);
    },
    updateHeight({ commit }, int) {
      commit("setHeight", int);
    },
    updateIterations({ commit }, int) {
      commit("setIterations", int);
    },
    updateL({ commit }, int) {
      commit("setL", int);
    },

    updateBoards({ commit }, obj) {
      commit("setBoards", obj);
    },
    updateP({ commit }, int) {
      commit("setP", int);
    },
    updateDistrabution({ commit }, arr) {
      commit("setDistrabution", arr);
    },
  },
});
