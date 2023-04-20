<template>
    <!-- make the div be on top of the rest of the template-->
    <div style="height: 250px;">
        current iteration: {{ itration }}
        <div>
            <button @click="start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                </svg>
            </button>
        </div>
    </div>
    <div style="border-color: blue; background-color:darkgray; border-radius: 1px;">
        <div v-for="(row, rowIndex) in currentBoard" :key="rowIndex" class="row">
            <div v-for="(cell, cellIndex) in row" :key="cellIndex" :style="{ backgroundColor: cellToColor(cell.knowRumor) }"
                class="cell"></div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex"
import { probability } from '../store/probability.js'


export default {
    components: {},
    computed: {
        ...mapState(['height', 'width', 'distrabution', 'p', 'boards', 'iterations', 'currentIteration', 'L'])
    },
    data() {
        return {
            pValue: 1,
            distrabutionValue: [0.25, 0.25, 0.25, 0.25],
            currentBoard: [],
            itration: 0,
        }
    },
    created() {
        this.currentBoard = this.boards.current
    },
    watch: {
        // watch state changes and update the data
        p(newVal, oldVal) {
            if (newVal < 0 || newVal > 1 || oldVal === newVal) return
            this.pValue = newVal
        },
        distrabution(newVal, oldVal) {
            if (newVal.length !== 4 || oldVal === newVal) return
            this.distrabutionValue = newVal
        },
        height(newVal, oldVal) {
            if (newVal < 0 || oldVal === newVal) return
            this.heightValue = newVal
        },
        width(newVal, oldVal) {
            if (newVal < 0 || oldVal === newVal) return
            this.widthValue = newVal
        },

        boards(newVal, oldVal) {
            this.currentBoard = newVal.current
        },

        currentIteration(newVal, oldVal) {
            if (newVal < 0 || oldVal === newVal) return
            this.itration = newVal
        }


    },
    methods: {
        ...mapActions(['updateIsBoardRunning', 'updateCurrentIteration']),
        choose_one() {
            let i = Math.floor(Math.random() * this.width);
            let j = Math.floor(Math.random() * this.height);
            //this.currentBoard[i][j]["L"] = L;
            this.currentBoard[i][j].knowRumor = 1;
            // make this cell S4
            this.currentBoard[i][j].value = 'S1';
            this.tell_neighbors(i, j);
        },
        tell_neighbors(i, j) {
            var x = [-1, 0, 1, 0];
            var y = [0, -1, 0, 1];
            const zip = (a, b) => a.map((k, i) => [k, b[i]]);
            for (const [dx, dy] of zip(x, y)) {
                if (i + dx >= 0 && i + dx < this.width && j + dy >= 0 && j + dy < this.height) {
                    this.currentBoard[i + dx][j + dy]["heard"] += 1;
                }
            }

        },

        start() {
            this.updateIsBoardRunning(true)
            this.choose_one();
            let k = 1500;
            for (let index = 0; index < this.iterations; index++) {
                // wait k miliseconds between iterations
                setTimeout(() => {
                    this.start_round();
                    this.itration++;
                    this.updateCurrentIteration(this.itration)
                }, k * index);
            }

        },
        cellToColor(num) {
        if (num === 0) return 'white'
        if (num === 1) return 'yellow'
        if (num === 2) return 'black'
        },

        doubt(cell) {
            //if (cell.value = 'E') return false

            let s = 0
            if (cell.value == 'S0') s = 0
            if (cell.value == 'S1') s = 1
            if (cell.value == 'S2') s = 2
            if (cell.value == 'S3') s = 3
            if (cell.value == 'S4') s = 4

            if (cell["heard"] > 1) {
                // level of doubt decrease
                s = s - 1;
            }
            if (s == 4) {
                // belives nothing
                return false;
            }
            if (s == 3 && probability(1 / 3)) {
                return true;
            }
            if (s == 2 && probability(2 / 3)) {
                return true;
            }

            if (s == 1 || s == 0) {
                return true;
            }
            return false;
        },

        updateKnowRumor() {
            // if knowRumor is 1 - change to 2
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    if (this.currentBoard[i][j].knowRumor == 1) {
                        this.currentBoard[i][j].knowRumor = 2;
                    }
                }
            }
        },

        start_round() {
            this.updateKnowRumor();

            var positions = [];
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    if (this.currentBoard[i][j].L > 0) {
                        this.currentBoard[i][j].L--;
                        continue;
                    }
                    if (this.currentBoard[i][j]["heard"] > 0) {
                        if (this.doubt(this.currentBoard[i][j])) {
                            // before passing - wait L rounds
                            this.currentBoard[i][j].L = this.L
                            if (this.currentBoard[i][j].knowRumor == 0)
                                this.currentBoard[i][j].knowRumor = 1;
                            positions.push([i, j]);
                        }
                        // before the next round
                        this.currentBoard[i][j]["heard"] = 0;
                    }
                }

            }

            // pass the rumor
            for (var [i, j] of positions) {
                this.tell_neighbors(i, j);
            }

            // check if the current iteration is the last one
            if (this.itration == this.iterations - 1) {
                this.updateIsBoardRunning(false)
            }
        }
    }
}


</script>

<style scoped>
.row {
    /* display: flex; */
}

.cell {
    width: 20px;
    height: 20px;
    border: 1px solid black;
}
</style>