<template>
    <div>
        <button @click="start">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill"
                viewBox="0 0 16 16">
                <path
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
        </button>
    </div>
    <div class="">
        <div v-for="(row, rowIndex) in currentBoard" :key="rowIndex" class="row">
            <div v-for="(cell, cellIndex) in row" :key="cellIndex" :style="{ backgroundColor: cellToColor(cell.value) }"
                class="cell"></div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex"


export default {
    components: {},
    computed: {
        ...mapState(['height', 'width', 'distrabution', 'p', 'boards'])
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


    },
    methods: {
        start() {
            // start the rummer process

        },
        cellToColor(cell) {
            // cell is one of {S1, S2, S3, S4, E} (E is empty), given a cell, return the color
            switch (cell) {
                case 'S1':
                    return 'red'
                case 'S2':
                    return 'blue'
                case 'S3':
                    return 'green'
                case 'S4':
                    return 'yellow'
                case 'E':
                    return 'white'
            }
        },
    }
}


</script>

<style scoped>
.row {
    display: flex;
}

.cell {
    width: 20px;
    height: 20px;
    border: 1px solid black;
}
</style>