<template>
    <div class="full-height full-width row no-wrap overflow-hidden">
        <q-tabs v-model="tab" vertical class="text-primary bg-grey-2" id="main_tabs" active-bg-color="grey-1"
            indicator-color="transparent">
            <q-tab name="rules" @click="expandSidePanel(e, 'variables')">
                <span class="icon-kindvariables" ></span>
                <q-tooltip anchor="center left" self="center right">variables</q-tooltip>
            </q-tab>
            <!-- wip tabs -->
            <!-- <q-tab name="fileTabs" @click="expandSidePanel(e, 'fileTabs')">
            <q-icon class="side_nav_icon icon-kindfiles" />
            <q-tooltip anchor="center left" self="center right">File View</q-tooltip>
        </q-tab> -->
            <q-tab name="info" @click="expandSidePanel(e, 'part b')">
                <q-icon class="side_nav_icon icon-kindinfo" />
                <q-tooltip anchor="center left" self="center right">part b</q-tooltip>
            </q-tab>
            <q-space />
            <q-btn @click="updateSideBarCollapsed(!sideBarCollapsed)"
                :icon="sideBarCollapsed ? 'o_chevron_right' : 'o_chevron_left'" square flat size="16px" padding="6px 10px"
                class="btn_absolute">
            </q-btn>

        </q-tabs>
        <div class="full-height full-width q-pt-md bg-grey-1 column no-wrap">
            <q-tab-panels v-model="tab" animated vertical transition-prev="jump-right" transition-next="jump-left"
                class="full-width full-height" style="background:transparent; ">
                <q-tab-panel name="variables" class="q-py-none">
                    ____________
                    <Varibales/>
                    ____________
                </q-tab-panel>
                <q-tab-panel name="part b" class="q-py-none">
                    hello part b
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Varibales from './Varibales.vue'

export default {
    components: {
        // MainTabsDrawer,
        Varibales
    },
    computed: { ...mapGetters(['', 'sideBarCollapsed', 'fileViewOpen']) },
    setup() {
        return {
            tab: ref('variables'),
        }
    },

    methods: {
        expandSidePanel(e, x) {
            return
            console.log("expandSidePanel", x, this.tab, this.sideBarCollapsed)
            if (this.tab !== x && !this.sideBarCollapsed) return
            this.updateSideBarCollapsed(!this.sideBarCollapsed)
        },
        ...mapActions(['updateSideBarCollapsed', ])
    },
}
</script>

<style scoped>
.iconInfoTrace {
    width: 10px;
    height: 10px;
    font-size: 10px;
    position: absolute;
    top: 5px;
    right: 0;
}
</style>