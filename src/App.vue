<script>
import { mapActions, mapGetters } from "vuex"
import MainGridNew from "./components/MainGridNew.vue"
import { createSharedComposable } from "@vueuse/core";



export default {
    components: { MainGridNew, createSharedComposable },
    computed: { ...mapGetters([]) },
    methods: {
        ...mapActions(['updateBoard'])

    },

    created() {
        this.updateBoard()
    }
}

</script >


<template>
    <q-layout view="hHh lpR fFf" style="height:100vh;">
        <q-header class="bg-white" bordered>
            <q-toolbar>
                <q-toolbar-title class="row">
                    <a style="height:34px;" href="/">
                        <img style="height:100%" src="../public/logo.svg">
                    </a>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container class="full-height  overflow-hidden column no-wrap">
            <MainGridNew />
        </q-page-container>
    </q-layout>
</template>
      
<style lang="scss">
@import "./styles/main.scss";

.wrapper_mulitcounter .q-field__native {
    font-weight: bold;
    padding: 0 0 8px;
}
</style>