<!-- src/components/LineChart.vue -->
<template>
  <div>
    <!-- <Line :data="chartData" :options="options" /> -->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// import { Line } from 'vue3-chart-v2';

export default defineComponent({
  name: 'LineChart',
  components: {
    // Line,
  },
  props: {
    chartData: {

      required: true,
    },
    options: {
      required: true,
    },
  },
});
</script>
