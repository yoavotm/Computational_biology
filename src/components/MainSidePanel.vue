<template>
  <div class="full-height full-width row no-wrap overflow-hidden">
    <div class="full-height full-width q-pt-md bg-grey-1 column no-wrap">
      <Varibales />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import Varibales from "./Varibales.vue";

export default {
  components: {
    Varibales,
  },
  computed: { ...mapGetters(["", "sideBarCollapsed", "fileViewOpen"]) },
  setup() {
    return {
      tab: ref("variables"),
    };
  },
};
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
