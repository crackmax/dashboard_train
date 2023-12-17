<template>
    <div>
        <div v-if="loading">
            <v-row>
                <v-col cols="5"></v-col>
                <v-col>
                    <h1>Data is loading...</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="5"> </v-col>
                <v-progress-circular
                    indeterminate
                    color="primary"
                    :size="300"
                ></v-progress-circular>
            </v-row>
        </div>
        <div v-if="!loading">
            <div>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col>
                        <h3>Repartition of instrument anomalies by train</h3>
                    </v-col>

                    <v-col>
                        <h3>Repartition of air intake anomalies by train</h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col><PieChart :chartData="chartData1" /></v-col>
                    <v-col><PieChart :chartData="chartData2" /></v-col>
                </v-row>
            </div>

            <div>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col>
                        <h3>
                            Repartition of oil temperature anomalies by train
                        </h3>
                    </v-col>
                    <v-col>
                        <h3>
                            Repartition of water temperature anomalies by train
                        </h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <PieChart :chartData="chartData3" />
                    </v-col>
                    <v-col>
                        <PieChart :chartData="chartData4" />
                    </v-col>
                </v-row>
            </div>
        </div>
        <br>
        <div>
            <PlotsView />
        </div>
    </div>
</template>
<script>
import PieChart from './PieChart';
import PlotsView from './PlotsView';

export default {
    name: 'HomeView',

    components: {
        PieChart,
        PlotsView
    },
    data() {
        return {
            loading: true,
            chartData1: {
                labels: [],
                datasets: [],
            },
            chartData2: {
                labels: [],
                datasets: [],
            },
            chartData3: {
                labels: [],
                datasets: [],
            },
            chartData4: {
                labels: [],
                datasets: [],
            },
        };
    },
    created() {
        this.getChartData();
    },
    computed: {},
    methods: {
        async getChartData() {
            try {
                // Fetch data from the endpoint
                this.loading = true;
                const response = await fetch(
                    'http://localhost:3000/getGeneralInfo',
                );
                this.loading = false;
                const data = await response.json();
                const result1 = data.result;
                const result2 = data.result2;
                const result3 = data.result3;
                const result4 = data.result4;

                const labels = Object.keys(result1);
                const counts1 = Object.values(result1);
                const counts2 = Object.values(result2);
                const counts3 = Object.values(result3);
                const counts4 = Object.values(result4);

                const backgroundColor = labels.map(() => {
                    // Random color in hex format
                    return `#${Math.floor(Math.random() * 16777215).toString(
                        16,
                    )}`;
                });
                // Construct the chartData structure
                const chartData1 = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'anomaly',
                            backgroundColor: backgroundColor,
                            data: counts1,
                        },
                    ],
                };
                const chartData2 = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'anomaly',
                            backgroundColor: backgroundColor,
                            data: counts2,
                        },
                    ],
                };
                const chartData3 = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'anomaly',
                            backgroundColor: backgroundColor,
                            data: counts3,
                        },
                    ],
                };
                const chartData4 = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'anomaly',
                            backgroundColor: backgroundColor,
                            data: counts4,
                        },
                    ],
                };

                this.chartData1 = chartData1;
                this.chartData2 = chartData2;
                this.chartData3 = chartData3;
                this.chartData4 = chartData4;
                console.log(this.chartData);
            } catch (error) {
                console.error('Error fetching chart data:', error);
                return null;
            }
        },
    },
};
</script>
