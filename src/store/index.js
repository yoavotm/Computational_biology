import { createStore } from "vuex";
//import axios from "axios";

export default createStore({
  state: {
    // the width of the board
    width: 6,
    // the height of the board
    height: 6,
    // the number of iterations in the simulation
    iterations: 0,
    // the number of iterations that a human doesnt pass the rumer after he passes it
    L: 0,
    // the board and the previous board
    boards: {
      current: [
        [
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S2",
            turnsUntilSpread: 0,
          },
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S4",
            turnsUntilSpread: 0,
          },
          {
            value: "S5",
            turnsUntilSpread: 0,
          },
          {
            value: "S3",
            turnsUntilSpread: 0,
          },
        ],
        [
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S2",
            turnsUntilSpread: 0,
          },
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S4",
            turnsUntilSpread: 0,
          },
          {
            value: "S5",
            turnsUntilSpread: 0,
          },
          {
            value: "S3",
            turnsUntilSpread: 0,
          },
        ],
        [
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S2",
            turnsUntilSpread: 0,
          },
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S4",
            turnsUntilSpread: 0,
          },
          {
            value: "S5",
            turnsUntilSpread: 0,
          },
          {
            value: "S3",
            turnsUntilSpread: 0,
          },
        ],
        [
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S2",
            turnsUntilSpread: 0,
          },
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S4",
            turnsUntilSpread: 0,
          },
          {
            value: "S5",
            turnsUntilSpread: 0,
          },
          {
            value: "S3",
            turnsUntilSpread: 0,
          },
        ],
        [
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S2",
            turnsUntilSpread: 0,
          },
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S4",
            turnsUntilSpread: 0,
          },
          {
            value: "S5",
            turnsUntilSpread: 0,
          },
          {
            value: "S3",
            turnsUntilSpread: 0,
          },
        ],
        [
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S2",
            turnsUntilSpread: 0,
          },
          {
            value: "S1",
            turnsUntilSpread: 0,
          },
          {
            value: "S4",
            turnsUntilSpread: 0,
          },
          {
            value: "S5",
            turnsUntilSpread: 0,
          },
          {
            value: "S3",
            turnsUntilSpread: 0,
          },
        ],
      ],
      last: [],
    },
    // the number of humans in the simulation
    P: 0.75,
    // the probability distribution of the 4 states for a human - S1, S2, S3, S4 - in the following order
    distrabution: [0.25, 0.25, 0.25, 0.25],
    // the state of the side bar
    sideBarCollapsed: false,
    // the state of the right side bar
    rightSideBarCollapsed: false,
  },
  getters: {
    getWidth: (state) => state.width,
    getHeight: (state) => state.height,
    getIterations: (state) => state.iterations,
    getL: (state) => state.L,
    getBoards: (state) => state.boards,
    getP: (state) => state.P,
    getDistrabution: (state) => state.distrabution,
    sideBarCollapsed: (state) => state.sideBarCollapsed,
    rightSideBarCollapsed: (state) => state.rightSideBarCollapsed,
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
    sideBarCollapsed: (state, bool) => (state.sideBarCollapsed = bool),
    rightSideBarCollapsed: (state, bool) =>
      (state.rightSideBarCollapsed = bool),
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
    updateSideBarCollapsed({ commit }, bool) {
      commit("sideBarCollapsed", bool);
    },
    updateRightSideBarCollapsed({ commit }, bool) {
      commit("rightSideBarCollapsed", bool);
    },
  },
});
