<template>
    <div style="position: relative;">
        <div style="margin-bottom: 5px;" v-if="seeType">
            colors:
                <span class="color color-cell" style="background-color: red; color: white;">S1</span>
                <span class="color color-cell" style="background-color: blue; color: white;">S2</span>
                <span class="color color-cell" style="background-color: green; color: white;">S3</span>
                <span class="color color-cell" style="background-color: yellow;  color: black;">S4</span>
        </div>

        <div style="margin-bottom: 5px;" v-else>
            colors:
                <span class="color color-cell info-cell" style="background-color: red; color: white">heard rumor</span>
                <span class="color color-cell info-cell" style="background-color: green; color: white">didnt hear rumor</span>
                <span class="color color-cell info-cell" style="background-color: yellow; color: black">hear rumor last generation</span>


        </div>
        <AnimationControl :startAnimationProp="start" :stopAnimationProp="stop" :slowAnimationProp="slowAnimation"
            :speedAnimationProp="speedAnimation" :isBoardRunningProp="isBoardRunning" :itrationProp="currentIteration"
            :waitingTime="waitingTime" />
        <div class="board">
            <div v-for="(row, rowIndex) in currentBoard" :key="rowIndex" class="row">
                <div v-for="(cell, cellIndex) in row" :key="cellIndex" :style="{ backgroundColor: cellToColor(cell) }"
                    class="cell"></div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex"
import { probability } from '../store/probability.js'
import AnimationControl from './AnimationControl.vue'
import { ANIMATION_SPEED_DELTA, MAX_WAITING_TIME, MIN_WAITING_TIME, STARTING_WAITING_TIME } from '../store/consts.js'



export default {
    components: {
        AnimationControl
    },
    computed: {
        ...mapState(['height', 'width', 'distrabution', 'p', 'boards', 'iterations', 'currentIteration',
            'L', 'isBoardRunning', 'areDiagonalNeighbors', 'iswrapAround', 'seeType'])
    },
    data() {
        return {
            pValue: 1,
            distrabutionValue: [0.25, 0.25, 0.25, 0.25],
            currentBoard: [],
            itration: 0,
            waitingTime: STARTING_WAITING_TIME,
            stopInTheMiddle: false,
            iswrapAroundValue: false,
            areDiagonalsNeighborsValue: false,
        }
    },
    mounted() {
        this.currentBoard = this.boards.current
        this.iswrapAroundValue = this.iswrapAround
        this.areDiagonalsNeighborsValue = this.areDiagonalNeighbors
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
            this.iswrapAroundValue = this.iswrapAround
            this.areDiagonalsNeighborsValue = this.areDiagonalNeighbors
            this.stopInTheMiddle = false;
        },

        currentIteration(newVal, oldVal) {
            if (newVal < 0 || oldVal === newVal) return
            this.itration = newVal
        }


    },
    methods: {
        ...mapActions(['updateIsBoardRunning', 'updateCurrentIteration', 'collectStats']),
        slowAnimation() {
            console.log(MAX_WAITING_TIME)
            if (this.waitingTime < MAX_WAITING_TIME) {
                this.waitingTime += ANIMATION_SPEED_DELTA
            }
        },

        speedAnimation() {
            if (this.waitingTime > MIN_WAITING_TIME) {
                this.waitingTime -= ANIMATION_SPEED_DELTA
            }
        },
        stop() {
            this.updateIsBoardRunning(false)
            this.stopInTheMiddle = true;
        },
        choose_one() {
            let i = Math.floor(Math.random() * this.width);
            let j = Math.floor(Math.random() * this.height);
            this.currentBoard[i][j].knowRumor = 1;
            this.currentBoard[i][j].value = 'S1';
            this.tell_neighbors(i, j);
        },

        get_neighbors_wrap_arround(i, j) {
            let neighbors = []
            // check if the cell is on the edge of the board
            if (i === 0) {
                // if it is on the edge then the neighbors are the other side of the board
                neighbors.push([this.width - 1, j])
            } else {
                // if it is not on the edge then the neighbors are the neighbors on the board
                neighbors.push([i - 1, j])
            }

            if (i === this.width - 1) {
                neighbors.push([0, j])
            } else {
                neighbors.push([i + 1, j])
            }

            if (j === 0) {
                neighbors.push([i, this.height - 1])
            } else {
                neighbors.push([i, j - 1])
            }

            if (j === this.height - 1) {
                neighbors.push([i, 0])
            } else {
                neighbors.push([i, j + 1])
            }

            if (this.areDiagonalNeighbors) {
                if (i === 0 && j === 0) {
                    neighbors.push([this.width - 1, this.height - 1])
                } else if (i === 0 && j === this.height - 1) {
                    neighbors.push([this.width - 1, 0])
                } else if (i === this.width - 1 && j === 0) {
                    neighbors.push([0, this.height - 1])
                } else if (i === this.width - 1 && j === this.height - 1) {
                    neighbors.push([0, 0])
                } else if (i === 0) {
                    neighbors.push([this.width - 1, j - 1])
                    neighbors.push([this.width - 1, j + 1])
                } else if (i === this.width - 1) {
                    neighbors.push([0, j - 1])
                    neighbors.push([0, j + 1])
                } else if (j === 0) {
                    neighbors.push([i - 1, this.height - 1])
                    neighbors.push([i + 1, this.height - 1])
                } else if (j === this.height - 1) {
                    neighbors.push([i - 1, 0])
                    neighbors.push([i + 1, 0])
                } else {
                    neighbors.push([i - 1, j - 1])
                    neighbors.push([i - 1, j + 1])
                    neighbors.push([i + 1, j - 1])
                    neighbors.push([i + 1, j + 1])
                }
            }

            return neighbors
        },

        get_neighbors(i, j) {
            let neighbors = []
            // check if the cell is on the edge of the board
            if (i !== 0) {
                // if it is not on the edge then the neighbors are the neighbors on the board
                neighbors.push([i - 1, j])
            }

            if (i !== this.width - 1) {
                neighbors.push([i + 1, j])
            }

            if (j !== 0) {
                neighbors.push([i, j - 1])
            }

            if (j !== this.height - 1) {
                neighbors.push([i, j + 1])
            }

            if (this.areDiagonalNeighbors) {
                if (i !== 0 && j !== 0) {
                    neighbors.push([i - 1, j - 1])
                }
                if (i !== 0 && j !== this.height - 1) {
                    neighbors.push([i - 1, j + 1])
                }
                if (i !== this.width - 1 && j !== 0) {
                    neighbors.push([i + 1, j - 1])
                }
                if (i !== this.width - 1 && j !== this.height - 1) {
                    neighbors.push([i + 1, j + 1])
                }
            }

            return neighbors
        },


        tell_neighbors(i, j) {
            // if the cell is on the edge of the board check if the board is wrap arround
            // if it is wrap arround then the neighbors are also the other side of the board
            // if it is not wrap arround then the neighbors are only the neighbors on the board
            let neighbors = []
            if (this.iswrapAroundValue) {
                neighbors = this.get_neighbors_wrap_arround(i, j)
            } else {
                neighbors = this.get_neighbors(i, j)
            }

            // increase all neighbors "heard" by 1
            for (let [x, y] of neighbors) {
                if (this.currentBoard[x][y].value === 'E') continue
                this.currentBoard[x][y].heard += 1
            }


        },

        start() {
            if (this.isBoardRunning) return
            this.updateIsBoardRunning(true)
            if (this.stopInTheMiddle === false) {
                this.choose_one();
            }
            this.start_round();

        },
        cellToColor(cell) {
            if (cell.value === 'E') return 'white'
            if (this.seeType) {
                if (cell.value === 'S1') return 'red'
                if (cell.value === 'S2') return 'blue'
                if (cell.value === 'S3') return 'green'
                if (cell.value === 'S4') return 'yellow'
            }
            if (cell.knowRumor === 1) return 'yellow'
            if (cell.knowRumor === 2) return 'red'
            if (cell.knowRumor === 0) return 'lime'
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
            if (!this.isBoardRunning) return
            if (this.itration >= this.iterations) {
                this.updateIsBoardRunning(false)
                return
            }
            this.updateKnowRumor();

            var positions = [];
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    if (this.currentBoard[i][j].L > 0) {
                        this.currentBoard[i][j]["heard"] = 0;
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
            // create obj to collect stats
            let statsObj = {
                current: this.currentBoard,
                iter: this.itration
            }
            this.collectStats(statsObj)

            // update the current iteration
            this.updateCurrentIteration(this.itration + 1)
            // wait for the next round
            setTimeout(this.start_round, this.waitingTime)
        }
    }
}


</script>

<style scoped>

.color-cell {
    width: 30px;
    height: 30px;
    margin: 3px;
    border: 1px solid rgb(0, 0, 0);
}

.info-cell {
    padding: 2px;
    margin: 2px;
}
.row {
    /* display: flex; */
}

.board {
    display: grid;
}

.cell {
    width: 5px;
    height: 5px;
    border: 1px solid rgb(0, 0, 0);
}
</style>