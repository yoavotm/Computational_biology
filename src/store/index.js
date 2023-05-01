import { createStore } from "vuex";
//import axios from "axios";

export default createStore({
  state: {
    // the width of the board
    width: 100,
    // the height of the board
    height: 100,
    // the number of iterations in the simulation
    iterations: 600,
    // the number of iterations that a human doesnt pass the rumer after he passes it
    L: 3,
    // the board and the previous board
    boards: {
      current: [],
      last: [],
    },
    // the number of humans in the simulation
    P: 0.85,
    // the probability distribution of the 4 states for a human - S1, S2, S3, S4 - in the following order
    distrabution: [0.2, 0.3, 0.3, 0.2],
    // the state of the side bar
    sideBarCollapsed: false,
    // the state of the right side bar
    rightSideBarCollapsed: false,
    isBoardRunning: false,
    iswrapAround: true,
    areDiagonalNeighbors: true,
    currentIteration: 0,
    stats: [],
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
    isBoardRunning: (state) => state.isBoardRunning,
    iswrapArround: (state) => state.iswrapArround,
    areDiagonalNeighbors: (state) => state.areDiagonalNeighbors,
    currentIteration: (state) => state.currentIteration,

    stats: (state) => state.stats,
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
    rightSideBarCollapsed: (state, bool) => (state.rightSideBarCollapsed = bool),
    isBoardRunning: (state, bool) => (state.isBoardRunning = bool),
    iswrapAround: (state, bool) => (state.iswrapAround = bool),
    areDiagonalNeighbors: (state, bool) => (state.areDiagonalNeighbors = bool),
    currentIteration: (state, int) => (state.currentIteration = int),
    stats: (state, arr) => (state.stats = arr),
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
    updateIsBoardRunning({ commit }, bool) {
      commit("isBoardRunning", bool);
    },
    updateIswrapAround({ commit }, bool) {
      commit("iswrapAround", bool);
    },

    updateAreDiagonalNeighbors({ commit }, bool) {
      commit("areDiagonalNeighbors", bool);
    },

    updateCurrentIteration({ commit }, int) {
      commit("currentIteration", int);
    },

    updateStats({ commit }, arr) {
      commit("stats", arr);
    },

    // this function is called when the user change one of the parameters, it will update the boards with the new parameters
    updateBoard({ commit, state }) {
      // get the new parameters
      const width = state.width;
      const height = state.height;
      const iterations = state.iterations;
      const L = state.L;
      const P = state.P;
      const distrabution = state.distrabution;
      let peopleIndexes = [];

      // calculate the number of humans in the simulation
      let humansNumber = Math.floor(P * width * height);
      console.log(humansNumber);

      for (let index = 0; index < humansNumber; index++) {
        // get random index for the human
        let random_i = Math.floor(Math.random() * width);
        let random_j = Math.floor(Math.random() * height);
        // check if the index is already taken
        while (
          peopleIndexes.find(
            (index) => index.x === random_i && index.y === random_j
          ) !== undefined
        ) {
          random_i = Math.floor(Math.random() * width);
          random_j = Math.floor(Math.random() * height);
        }
        // add the index to the array
        peopleIndexes.push({ x: random_i, y: random_j });
      }
      // each array represents one of the 4 states of the simulation - S1, S2, S3, S4
      let indexes = [[], [], [], []];
      // choose the number of people for each state according to the distrabution, and add the indexes to the array
      let numbers = distrabution.map((number) =>
        Math.floor(number * humansNumber)
      );
      let sum = 0;
      for (let index = 0; index < numbers.length; index++) {
        for (let i = 0; i < numbers[index]; i++) {
          // choose random index for the human from the peopleIndexes array
          let randomIndex = Math.floor(Math.random() * peopleIndexes.length);
          // add the index to the array
          indexes[index].push(peopleIndexes[randomIndex]);
          // remove the index from the peopleIndexes array
          peopleIndexes.splice(randomIndex, 1);
          sum += 1;
        }
      }
      // add the rest of the indexes to the highest probability index
      let max = Math.max(...numbers);
      let maxIndex = numbers.indexOf(max);
      // add the rest of the indexes to the array
      for (let index = 0; index < peopleIndexes.length; index++) {
        indexes[maxIndex].push(peopleIndexes[index]);
      }

      // create the board
      let board = [];
      for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
          // create a cell
          let cell = {
            value: "E",
            L: 0,
            heard: 0,
            knowRumor: 0,
          };
          // check if the cell is a human
          if (
            indexes[0] &&
            indexes[0].find((index) => index.x === i && index.y === j) !==
              undefined
          ) {
            cell.value = "S1";
          } else if (
            indexes[1] &&
            indexes[1].find((index) => index.x === i && index.y === j) !==
              undefined
          ) {
            cell.value = "S2";
          } else if (
            indexes[2] &&
            indexes[2].find((index) => index.x === i && index.y === j) !==
              undefined
          ) {
            cell.value = "S3";
          } else if (
            indexes[3] &&
            indexes[3].find((index) => index.x === i && index.y === j) !==
              undefined
          ) {
            cell.value = "S4";
          }
          // add the cell to the row
          row.push(cell);
        }
        // add the row to the board
        board.push(row);
      }

      // create the new boards array
      let newBoard = {
        current: board,
        last: board,
      };
      // update the boards in the store
      commit("setBoards", newBoard);
      // update the current iteration in the store
      commit("currentIteration", 0);
      // reset stats
      commit('stats', []);
    },

    // collecting stats about the simulation
    collectStats({ commit, state }, obj) {
      let currentBoard = obj.current;
      let iter = obj.iter;
      let stats = state.stats;

      // create obj for current iteration
      let currentIteration = {
        count: 0,
        iter: iter,
      };

      // count the number of people in each state
      for (let i = 0; i < currentBoard.length; i++) {
        for (let j = 0; j < currentBoard[i].length; j++) {
          if (currentBoard[i][j].knowRumor > 0) {
            currentIteration.count += 1;
          }
        }
      }

      // add the current iteration to the stats array
      stats.push(currentIteration);
      // update the stats in the store
      commit("stats", stats);
    },
  },
});
