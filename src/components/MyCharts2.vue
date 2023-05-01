// src/App.vue
<template>
    xxx

    <div style="width: 600px; height: 400px;">
        <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
    xxx
</template>

<script>
import { ref } from "vue";
import LineChart from "./LineChart.vue";
import { mapState } from "vuex";

export default {
    components: {
        LineChart,
    },
    setup() {
        const chartData = ref({
            labels: [],
            datasets: [
                {
                    label: "My Data",
                    data: [],
                    borderColor: "#f87979",
                    fill: false,
                },
            ],
        });

        const chartOptions = ref({
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        ticks: {
                            callback: function (value, index, values) {
                                // Show only 20 ticks on the x-axis
                                return index % Math.ceil(values.length / 20) === 0 ? value : "";
                            },
                        },
                    },
                ],
            },
        });

        return {
            chartData,
            chartOptions,
        };
    },
    computed: {
        ...mapState(['stats', 'currentIteration', 'isBoardRunning']),
        xvals() {
            let arr = [];
            for (let i = 0; i < this.stats.length; i++) {
                arr.push(this.stats[i].iter);
            }
            return arr;
        },

        yvals() {
            let arr = [];
            for (let i = 0; i < this.stats.length; i++) {
                arr.push(this.stats[i].count);
            }
            return arr;
        },
    },
    watch: {
        xvals(newVal, oldVal) {
            this.chartData.labels = newVal;
        },
        yvals(newVal, oldVal) {
            this.chartData.datasets[0].data = newVal;
        },
    },
};
</script>
