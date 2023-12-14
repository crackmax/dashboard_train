<template>
    <v-container>
        <v-row>
            <h1>TRAIN: {{ train_id }}</h1>
        </v-row>
        <div v-if="inst_anomalies.length > 0">
            <v-row>
                <h3>Instrument anomalies</h3>
            </v-row>
            <v-row>
                <v-col cols="3">

                    <v-select v-model="selectedItem" label="Select instrument anomaly number" :items="indexedInstAnomalies"
                        no-data-text="no anomalies" @change="createChart"></v-select>
                </v-col>
                <v-col cols="1">

                </v-col>
                <v-col cols="7">
                    <h3>Anomaly location</h3>
                    <LocationMap :center="selectedAnomalyCenter" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-select v-model="selectedColumn" label="Select column to analyse" :items="columnTitles" no-data-text="no anomalies"
                        @change="createChart"></v-select>
                </v-col>
                <v-col>
                    <h3>{{ selectedColumn }}</h3>

                    <LineChart :chartData="chartData" />
                </v-col>
            </v-row>
        </div>
        <div v-else>
            <h3>No instrument anomalies reported</h3>
        </div>
    </v-container>
</template>
  
<script>
import LocationMap from './LocationMap';
import eventBus from '../vuex/eventbus';
import LineChart from './LineChart';
export default {
    name: 'AnalysisWindow',

    components: {
        LocationMap,
        LineChart,
    },
    data() {
        return {
            inst_anomalies: [],
            columnTitles: ['Air temperature', 'Oil pressure', 'RPM', 'WaterTemp', 'OilTemp'],
            objectTitles: ['RS_E_InAirTemp_PC1',
                'RS_E_InAirTemp_PC2',
                'RS_E_OilPress_PC1',
                'RS_E_OilPress_PC2',
                'RS_E_RPM_PC1',
                'RS_E_RPM_PC2',
                'RS_E_WatTemp_PC1',
                'RS_E_WatTemp_PC2',
                'RS_T_OilTemp_PC1',
                'RS_T_OilTemp_PC2'],
            selectedColumn: 'Air temperature',
            selectedItem: 0,
            train_id: null,
            chartData: {
                labels: [],
                datasets: [

                ],
            },
        }
    },
    mounted() {
        // Listen for the event
        eventBus.$on('inst_anomales', (data) => {
            if (data && data.content.length > 0) {
                this.inst_anomalies = data.content;
            } else {
                this.inst_anomalies = [];
            }
            this.createChartData(this.inst_anomalies[0])
            this.selectedItem = 0;
        });
        eventBus.$on('train_id', (data) => {
            this.train_id = data
        });
    },
    computed: {
        indexedInstAnomalies() {
            return this.inst_anomalies.map((item, index) => ({ index, text: index }));
        },
        selectedAnomalyCenter() {
            let center = []
            if (this.inst_anomalies && this.inst_anomalies.length > 0) {
                center.push(this.inst_anomalies[this.selectedItem][Math.floor(this.inst_anomalies[0].length / 2)].lat)
                center.push(this.inst_anomalies[this.selectedItem][Math.floor(this.inst_anomalies[0].length / 2)].lon)
            }
            return center
        }
    },
    methods: {
        createChart() {
            this.createChartData(this.inst_anomalies[this.selectedItem])
        },
        createChartData(dataArray) {
            // Initialize arrays to store timestamps and RS_E_WatTemp_PC1 values
            const timestamps = [];
            const watTempData = [];
            const watTempData_PC2 = [];
            dataArray.forEach(obj => {
                timestamps.push(obj.timestamps_UTC);
                watTempData.push(obj[this.objectTitles[2 * this.columnTitles.indexOf(this.selectedColumn)]]);
                if (!obj.RS_E_WatTemp_PC2) {
                    watTempData_PC2.push(-1)
                } else {
                    watTempData_PC2.push(obj[this.objectTitles[2 * this.columnTitles.indexOf(this.selectedColumn) + 1]])

                }
            });


            const chartData = {
                labels: timestamps,
                datasets: [
                    {
                        label: this.objectTitles[2 * this.columnTitles.indexOf(this.selectedColumn)],
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        data: watTempData,
                    },
                    {
                        label: this.objectTitles[2 * this.columnTitles.indexOf(this.selectedColumn) + 1],
                        backgroundColor: 'rgba(255, 123, 255, 0.5)',
                        data: watTempData_PC2,
                    },
                ],
            };

            this.chartData = chartData;
        }

    }
};
</script>
  
<style scoped>
.main-container {
    display: flex;
    width: 100%;
    height: 100vh;
    /* Adjust the height as needed */
}
h3 {
      text-align: center;
      /* You can add additional styles as needed */
    }
</style>
  