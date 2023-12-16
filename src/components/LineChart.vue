<template>
    <LineCa id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line as LineCa } from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
)

export default {
    name: 'LineChart',
    components: { LineCa },
    props: {
        chartData: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            chartOptions: {
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'xy',
                        },
                        pan:{
                            enabled:true,
                        }
                    }
                },
                responsive: true
            }
        }
    }
}
</script>