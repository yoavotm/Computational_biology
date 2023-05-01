<template>
    <!-- form to see and set values for board-->
    <div class="board-settings">
        <div class="board-settings__item">
            <label for="p">p</label>
            <input type="number" id="p" v-model.number="pValue" step="0.01" min="0" max="1" :disabled="isBoardRunning">
        </div>

        <div class="board-settings__item">
            <label for="height">L</label>
            <input type="number" id="L" v-model.number="LValue" step="1" min="0" :disabled="isBoardRunning">
        </div>
        <div class="board-settings__item">
            <label for="distrabution">distrabution</label>
            <!-- make 2 in each row-->
            <div>
                S1
                <input type="number" id="distrabution" v-model.number="distrabutionValue[0]" step="0.01" min="0" max="1"
                    :disabled="isBoardRunning" @change="distrabutionError">
                S2
                <input type="number" id="distrabution" v-model.number="distrabutionValue[1]" step="0.01" min="0" max="1"
                    :disabled="isBoardRunning" @change="distrabutionError">
            </div>
            <div>
                S3
                <input type="number" id="distrabution" v-model.number="distrabutionValue[2]" step="0.01" min="0" max="1"
                    :disabled="isBoardRunning" @change="distrabutionError">
                S4
                <input type="number" id="distrabution" v-model.number="distrabutionValue[3]" step="0.01" min="0" max="1"
                    :disabled="isBoardRunning" @change="distrabutionError">
            </div>
        </div>

        <div>
            <!-- checkbox to determinate if the board should be edge - connected -->
            <input type="checkbox" id="edge" v-model="isWrapAroundValue" :disabled="isBoardRunning">

            <label for="edge">&nbsp;&nbsp;Wrap Around</label>
        </div>

        <div>
            <!-- check box to terminate if the neighbers of each cell is 4 sides or also diagonals-->
            <input type="checkbox" id="diagonals" v-model="areDiagonalsNeighborsValue" :disabled="isBoardRunning">

            <label for="diagonals">&nbsp;&nbsp;Moore neighborhood (diagonals as neighbers)</label>
        </div>
    </div>
    <button @click="generateBoard" :disabled="isBoardRunning" class="button-generate"
    :style="{color: errors.some(error => error.active) ? 'red' : 'green'}">
        genrate board
    </button>

    <button @click="generateSlowBoard" :disabled="isBoardRunning" class="button-generate" >
        genrate slow board
    </button>

    <button @click="generateFastBoard" :disabled="isBoardRunning" class="button-generate">
        genrate fast board
    </button>

    <div v-if="errors.some(error => error.active)">
        <div v-for="error in errors" :key="error.message">
            <p v-if="error.active" style="color: red; font-size: small; ">{{ error.message }}</p>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex"


export default {
    components: {},
    computed: {
        ...mapState(['height', 'width', 'distrabution', 'P', 'boards', 'isBoardRunning', 'L', 'areDiagonalNeighbors', 'isWrapAround'])
    },
    data() {
        return {
            pValue: 1,
            distrabutionValue: [0.25, 0.25, 0.25, 0.25],
            heightValue: 10,
            widthValue: 10,
            isWrapAroundValue: false,
            areDiagonalsNeighborsValue: false,
            LValue: 2,
            errors: [{
                message: 'p must be between 0 and 1',
                active: false,
            },
            {
                message: 'distrabution must sum to 1',
                active: false,
            },
            {
                message: 'height must be a positive number',
                active: false,
            },
            {
                message: 'width must be a positive number',
                active: false,
            },
            {
                message: 'L must be a positive number',
                active: false,
            }
            ],
        }
    },
    mounted() {
        console.log(this.isBoardRunning)
        this.pValue = this.P
        this.distrabutionValue = this.distrabution
        this.heightValue = this.height
        this.widthValue = this.width
        this.LValue = this.L
        this.isWrapAroundValue = this.isWrapAround
        this.areDiagonalsNeighborsValue = this.areDiagonalNeighbors


    },
    watch: {
        pValue(newVal, oldVal) {
            this.PError()
            if (newVal < 0 || newVal > 1 || oldVal === newVal) return
            this.updateP(newVal)
        },
        distrabutionValue(newVal, oldVal) {
            this.distrabutionError()
            if (newVal.length !== 4 || oldVal === newVal) return
            this.updateDistrabution(newVal)
        },
        heightValue(newVal, oldVal) {
            this.heightError()
            if (newVal < 0 || oldVal === newVal) return
            this.updateHeight(newVal)
        },
        widthValue(newVal, oldVal) {
            this.widthError()
            if (newVal < 0 || oldVal === newVal) return
            this.updateWidth(newVal)
        },
        LValue(newVal, oldVal) {
            this.LError()
            if (newVal < 0 || oldVal === newVal) return
            this.updateL(newVal)
        },
        isWrapAroundValue(newVal, oldVal) {
            if (oldVal === newVal) return
            this.updateIswrapAround(newVal)
        },
        areDiagonalsNeighborsValue(newVal, oldVal) {
            if (oldVal === newVal) return
            this.updateAreDiagonalNeighbors(newVal)
        }

    },
    methods: {
        ...mapActions(['updateP', 'updateDistrabution', 'updateHeight', 'updateWidth', 'updateBoard', 'updateL',
                       'updateIswrapAround', 'updateAreDiagonalNeighbors','generateSlowBoard', 'generateFastBoard']),

        // functions to check activation of each error

        PError() {
            if (this.pValue < 0 || this.pValue > 1) {
                this.errors[0].active = true
                return
            }
            this.errors[0].active = false
        },

        distrabutionError() {
            if (this.distrabutionValue.length !== 4 || this.distrabutionValue.reduce((a, b) => a + b, 0) !== 1) {
                this.errors[1].active = true
                return
            }
            this.errors[1].active = false
        },

        heightError() {
            if (this.heightValue < 0) {
                this.errors[2].active = true
                return
            }
            this.errors[2].active = false
        },

        widthError() {
            if (this.widthValue < 0) {
                this.errors[3].active = true
                return
            }
            this.errors[3].active = false
        },

        LError() {
            if (this.LValue < 0) {
                this.errors[4].active = true
                return
            }
            this.errors[4].active = false
        },

        // function to check all errors

        checkErrors() {
            this.PError()
            this.distrabutionError()
            this.heightError()
            this.widthError()
            this.LError()
        },


        generateBoard() {
            this.checkErrors()

            if (this.errors.some(error => error.active)) {
                return
            }
            this.updateBoard()
        }

    }
}
</script>


<style scoped>

.button-generate {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}
.board-settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
}

.board-settings__item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 7px;
}

.board-settings__item label {
    margin: 7px;
}

.board-settings__item input {
    margin: 7px;
}
</style>