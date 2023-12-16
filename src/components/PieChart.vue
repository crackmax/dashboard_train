<template>
    <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
} from 'chart.js';
import { Pie as Pie } from 'vue-chartjs';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
    name: 'PieChart',
    components: {
        Pie,
    },
    props: {
        chartData: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins:{
                    legend:{
                        display:false
                    }
                }
            },
        };
    },
};
</script>
