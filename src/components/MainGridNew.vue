<template>
    <div class="row full-height no-wrap full-width">
        <!-- grid -->
        <div class="grid full-width full-height" id="main_grid" ref="grid">
            <div style="grid-column: 1 / 2; grid-row: 1 / 5;" id="one">
                <MainSidePanel />
            </div>
            <div class="gutter-col gutter-col-1 bg-grey-1" :class="{ collapsed_gutter: sideBarCollapsed }"
                id="main_gutter_1"></div>
            <div style="grid-column: 5 / -1; grid-row: -2 / 5;">
                <RightSidePanel />
            </div>
            <div class="gutter-col gutter-col-3 bg-grey-1" id="main_gutter_2"
                :class="{ collapsed_gutter: rightSideBarCollapsed }"></div>
            <div style="grid-area: 3 / 3 / 5 / 4;" id="two">
                <CallTraceGrid />
            </div>
            <div class="gutter-row gutter-row-1 bg-grey-1" id="main_gutter_3"></div>
            <div class="crumbs_wrapper row q-my-sm" style="grid-column:3 / 6; grid-row: 1 / 2;">
                <Transition>
                    <BreadCrumbs v-if="isOutputSelected && !isTreeLoading && !globalResSelected" />
                    <div class="row full-width q-my-auto skeleton_absolute_left"
                        v-else-if="(!isOutputSelected && !isTreeLoading) || globalResSelected">
                        <q-badge class="bread_crumbs_empty q-my-auto" />
                        <q-badge class="bread_crumbs_empty q-my-auto" />
                        <q-badge class="bread_crumbs_empty q-my-auto" />
                        <q-space />
                        <q-badge style="width:32px; height:32px; margin-right: 0;" class="bread_crumbs_empty" />

                    </div>
                    <q-item v-else-if="isTreeLoading" class="skeleton_absolute_left row ">
                        <q-item-section>

                            <q-item-label caption>
                                <q-skeleton type="text" />
                            </q-item-label>
                            <q-item-label caption>
                                <q-skeleton type="text" />
                            </q-item-label>
                            <q-item-label caption>
                                <q-skeleton type="text" />
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </Transition>

            </div>
        </div>
    </div>
</template>

<script>
import MainSidePanel from './MainSidePanel.vue'
import Split from 'split-grid'

import { ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import RightSidePanel from './RightSidePanel.vue';



export default {
    components: {
        RightSidePanel,
        MainSidePanel,
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
            this.collapsed = false;
            this.gutter_collapse_expand(side, '350px', this.$refs.grid.style.gridTemplateColumns.split(' '))
        },
        gutter_collapse(side) {
            this.collapsed = true;  
            this.gutter_collapse_expand(side, '50px', this.$refs.grid.style.gridTemplateColumns.split(' '))
        },

        gutter_collapse_expand(side, size, currentStyle){
            // style from DOMelement returns [''] if it was never moved (has no inline styles)
            let gridColArr = currentStyle
            // check for inline styles
            if(currentStyle.length === 1) {
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
