
<template>
    <div class="row full-height no-wrap full-width">
        <!-- grid -->
        <div class="grid full-width full-height" id="main_grid" ref="grid">
            <div style="grid-column: 1 / 2; grid-row: 1 / 5;" id="one">
                <MainSidePanel />
            </div>
            <div style="grid-area: 3 / 4 / 4 / 3;" id="two">
                <div class="board-wrapper">
                    <Board />
                </div>
            </div>
            <!-- div for charts, right side of the screen-->
            <div style="grid-area: 3 / 4 / 4 / 5;" id="three">
                <div class="chart-wrapper">
                    <div class="chart-container">
                        <MyCharts2 />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MainSidePanel from './MainSidePanel.vue'
import Board from './Board.vue'
import Split from 'split-grid'

import { ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import MyCharts from './MyCharts.vue'
// import chart v2
import MyCharts2 from './MyCharts2.vue'



export default {
    components: {
        MainSidePanel,
        Board,
        MyCharts,
        MyCharts2
    },

    computed: mapGetters(['sideBarCollapsed', 'rightSideBarCollapsed']),
    setup() {
        return {

            instance: ref({}),
            collapsed: ref(false)
        }
    },
    watch: {
        sideBarCollapsed(newVal, oldVal) {
            // newVal true/false collapse/expand
            if (newVal) {
                this.gutter_collapse(0)
                return
            }
            this.gutter_expand(0)

        },
        rightSideBarCollapsed(newVal, oldVal) {
            // newVal true/false collapse/expand
            if (newVal) {
                this.gutter_collapse(4)
                return
            }
            this.gutter_expand(4)

        }
    },
    methods: {
        gutter_expand(side) {
            return
            this.collapsed = false;
            this.gutter_collapse_expand(side, '350px', this.$refs.grid.style.gridTemplateColumns.split(' '))
        },
        gutter_collapse(side) {
            return
            this.collapsed = true;
            this.gutter_collapse_expand(side, '50px', this.$refs.grid.style.gridTemplateColumns.split(' '))
        },

        gutter_collapse_expand(side, size, currentStyle) {
            return
            // style from DOMelement returns [''] if it was never moved (has no inline styles)
            let gridColArr = currentStyle
            // check for inline styles
            if (currentStyle.length === 1) {
                //"apply" baseStyle from CSS
                gridColArr = ['350px', '1px', 'auto', '1px', '350px']
            }
            // 50px || 350px
            gridColArr[side] = size
            // set new style
            this.$refs.grid.style = `grid-template-columns: ${gridColArr.join(' ')};`
        },
        ...mapActions(['updateSideBarCollapsed'])

    },
    mounted() {
        // https://split.js.org/
        return
        this.instance = Split({
            columnGutters: [{
                track: 1,
                element: document.querySelector('.gutter-col-1'),
            }, {
                track: 3,
                element: document.querySelector('.gutter-col-3'),
            }],
            rowGutters: [{
                track: 1,
                element: document.querySelector('.gutter-row-1'),
            }],
            columnMinSize: 350,
        })
    }
}
</script>


<style scoped>
.board-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.board-wrapper>div {
    margin: auto;
}

.chart-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.chart-wrapper>div {
    margin-right: 200px;

}

.chart-container {
    width: 100%;
    height: 100%;
}

.grid {
    display: grid;
    grid-template-rows: auto 0px 1fr;
    /* grid-template-columns: 1fr 1px 1fr 1px 1fr; */
    grid-template-columns: 350px 1px auto 1px 350px;
}

.gutter-col {
    z-index: 9;
    transition: all 0.2s ease-in-out;
    margin-top: 1px;
    margin: 1px -2px 0 -2px;
}

.gutter-col:hover,
.gutter-col:active {
    margin: 1px -2px 0 -2px;
    background: var(--q-primary) !important;
}

.gutter-col {
    grid-row: 1/-1;
    cursor: col-resize;
}

.gutter-col-1 {
    grid-column: 2;
    grid-row: 1 / 5;
    margin-top: 0;
}

.gutter-col-3 {
    grid-column: 4;
    grid-row: 2 / 5;
}

.gutter-row {
    grid-column: 1/-1;
    cursor: row-resize;
}

.gutter-row-1 {
    grid-row: 2;
}

.collapsed_gutter {
    width: 0;
    margin: 0;
}
</style>