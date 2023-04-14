<template>
    <!-- form to see and set values for board-->
    <div class="board-settings">
        <div class="board-settings__item">
            <label for="p">p</label>
            <input type="number" id="p" v-model.number="pValue" step="0.01" min="0" max="1">
        </div>
        <div class="board-settings__item">
            <label for="distrabution">distrabution</label>
            <!-- make 2 in each row-->
            <div>
                <input type="number" id="distrabution" v-model.number="distrabutionValue[0]" step="0.01" min="0" max="1">
                <input type="number" id="distrabution" v-model.number="distrabutionValue[1]" step="0.01" min="0" max="1">
            </div>
            <div>
                <input type="number" id="distrabution" v-model.number="distrabutionValue[2]" step="0.01" min="0" max="1">
                <input type="number" id="distrabution" v-model.number="distrabutionValue[3]" step="0.01" min="0" max="1">
            </div>
        </div>
        <div class="board-settings__item">
            <label for="height">height</label>
            <input type="number" id="height" v-model.number="heightValue" step="1" min="0">
        </div>
        <div class="board-settings__item">
            <label for="width">width</label>
            <input type="number" id="width" v-model.number="widthValue" step="1" min="0">
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex"


export default {
    components: {},
    computed: {
        ...mapState(['height', 'width', 'distrabution', 'P', 'boards'])
    },
    data() {
        return {
            pValue: 1,
            distrabutionValue: [0.25, 0.25, 0.25, 0.25],
            heightValue: 10,
            widthValue: 10,
        }
    },
    created() {
        this.pValue = this.P
        console.log("p")
        console.log(this.P)
        this.distrabutionValue = this.distrabution
        this.heightValue = this.height
        this.widthValue = this.width
    },
    watch: {
        pValue(newVal, oldVal) {
            if (newVal < 0 || newVal > 1 || oldVal === newVal) return
            this.updateP(newVal)
        },
        distrabutionValue(newVal, oldVal) {
            if (newVal.length !== 4 || oldVal === newVal) return
            this.updateDistrabution(newVal)
        },
        heightValue(newVal, oldVal) {
            if (newVal < 0 || oldVal === newVal) return
            this.updateHeight(newVal)
        },
        widthValue(newVal, oldVal) {
            if (newVal < 0 || oldVal === newVal) return
            this.updateWidth(newVal)
        }
    },
    methods: {
        ...mapActions(['updateP', 'updateDistrabution', 'updateHeight', 'updateWidth']),

    }
}
</script>


<style scoped>
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
    margin: 10px;
}

.board-settings__item label {
    margin: 10px;
}

.board-settings__item input {
    margin: 10px;
}
</style>