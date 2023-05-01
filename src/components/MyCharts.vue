<template>
    <Chart :key="stats.length" :size="{ width: 400, height: 340 }" :data="data" :margin="margin"
        :direction="direction"  :options="options">

        <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line :dataKeys="['iter', 'count']" type="natural" :dotSize="0" :pointRadius="0" />
        </template>

    </Chart>
</template>



<script>
import { mapActions, mapGetters, mapState } from "vuex"
import { Chart, Grid, Line } from 'vue3-charts'
import { Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

import { ref } from 'vue'


export default {
    components: {
        Chart,
        Grid,
        Line,
    },

    setup() {
        const direction = ref('horizontal')
        const margin = ref({
            left: 0,
            top: 20,
            right: 20,
            bottom: 0
        })

        const axis = ref({
            primary: {
                type: 'linear', // Set type to 'linear' for numerical data
                position: 'bottom', // Position the x-axis at the bottom of the chart
                label: 'Rounds', // Set the title for the x-axis
            },
            secondary: {
                domain: ['dataMin', 'dataMax + 100'],
                type: 'linear',
                position: 'left',
                label: 'heard the rumor',

            }
        })

        const options = ref({
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Rounds'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'heard the rumor'
                    }
                }
            }
        })

        return { direction, margin, axis, options }
    },
    data() {
        return {
            data: [],
        }
    },
    computed: {
        ...mapState(['stats', 'currentIteration', 'isBoardRunning']),
    },
    watch: {
        currentIteration(newVal, oldVal) {
            console.log("stats on iter:" + newVal)
            console.log(this.stats)


            this.data = this.stats
        }
    },
}



</script>