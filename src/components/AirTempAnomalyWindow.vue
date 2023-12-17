<template>
    <div>

        <v-row>
            <h3>Treshold anomalies</h3>
        </v-row>

        <v-row>
            <v-col cols="3">
                    <v-select v-model="selectedColumn" label="Select treshold anomaly" :items="columnTitles" 
                    @change="fetchTempAnomalyFile" no-data-text="no anomalies">
                    </v-select>
            </v-col>
            <v-col>
                <h3>{{ selectedColumn }}</h3>

                <LineChart :chartData="chartData" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                <v-select v-model="selectedItem" label="Select an anomaly" :items="indexedTresholdAnomalies" no-data-text="no anomalies"
                    @change="createChart"></v-select>
            </v-col>
            <v-col cols="7">
                    <h3>Anomaly location</h3>
                    <LocationMap :center="selectedAnomalyCenter" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import LineChart from './LineChart';
import eventBus from '../vuex/eventbus';
import LocationMap from './LocationMap';
export default {
    name: 'AirTempAnomalyWindow',

    components: {
        LocationMap,
        LineChart,
    },
    data() {
        return {
            treshdold_anomalies: [],
            airTempAnomalies:[],
            oilTempAnomalies:[],
            watTempAnomalies: [],
            columnTitles: ['Air temperature', 'OilTemp', 'WatTemp', 'All'],
            objectTitles: ['RS_E_InAirTemp_PC1',
                'RS_E_InAirTemp_PC2',
                'RS_T_OilTemp_PC1',
                'RS_T_OilTemp_PC2',
                'RS_E_WatTemp_PC1',
                'RS_E_WatTemp_PC2',],
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
        eventBus.$on('train_id', (data) => {
            this.train_id = data
            this.selectedItem = 0;
            this.selectedColumn == 'Air temperature'
            if(this.selectedColumn == 'Air temperature'){
                 this.fetchTempAnomalyFile();
                this.createChartData(this.airTempAnomalies.content[0])
                this.selectedItem = 0;
            }

            if(this.selectedColumn == 'OilTemp'){
                this.fetchTempAnomalyFile();
                this.createChartData(this.oilTempAnomalies.content[0])
                this.selectedItem = 0;
            }

            if(this.selectedColumn == 'WatTemp'){
                this.fetchTempAnomalyFile();
                this.createChartData(this.watTempAnomalies.content[0])
                this.selectedItem = 0;
            }
        });
        
    },
    computed: {
        indexedTresholdAnomalies() {
            if(this.selectedColumn == 'Air temperature' && this.airTempAnomalies.content){
                this.createChartData(this.airTempAnomalies.content[0])
                return this.airTempAnomalies.content.map((item, index) => ({ index, text: index }));
            }

            if(this.selectedColumn == 'OilTemp' && this.oilTempAnomalies.content){
                this.createChartData(this.oilTempAnomalies.content[0])
                return this.oilTempAnomalies.content.map((item, index) => ({ index, text: index }));
            }

            if(this.selectedColumn == 'WatTemp' && this.watTempAnomalies.content){
                this.createChartData(this.watTempAnomalies.content[0])
                return this.watTempAnomalies.content.map((item, index) => ({ index, text: index }));
            }

            return null
        },
        selectedAnomalyCenter() {
            let center = []
            if (this.selectedColumn == 'Air temperature' && this.airTempAnomalies.content && this.airTempAnomalies.content.length > 0) {
                center.push(this.airTempAnomalies.content[this.selectedItem][Math.floor(this.airTempAnomalies.content[0].length / 2)].lat)
                center.push(this.airTempAnomalies.content[this.selectedItem][Math.floor(this.airTempAnomalies.content[0].length / 2)].lon)
            }

            if (this.selectedColumn == 'OilTemp' && this.oilTempAnomalies.content && this.oilTempAnomalies.content.length > 0) {
                center.push(this.oilTempAnomalies.content[this.selectedItem][Math.floor(this.oilTempAnomalies.content[0].length / 2)].lat)
                center.push(this.oilTempAnomalies.content[this.selectedItem][Math.floor(this.oilTempAnomalies.content[0].length / 2)].lon)
            }

            if (this.selectedColumn == 'WatTemp' && this.watTempAnomalies.content && this.watTempAnomalies.content.length > 0) {
                center.push(this.watTempAnomalies.content[this.selectedItem][Math.floor(this.watTempAnomalies.content[0].length / 2)].lat)
                center.push(this.watTempAnomalies.content[this.selectedItem][Math.floor(this.watTempAnomalies.content[0].length / 2)].lon)
            }

            return center
        }
        
    },
    methods:{
        async fetchTempAnomalyFile(){
            try{
                if(this.selectedColumn == 'Air temperature'){
                    const params = new URLSearchParams();
                    const value = 'InAirTempAnomaly_' + this.train_id +'.json'
                    params.append('fileName', value);
                    const response = await fetch('http://localhost:3000/getFileAirTemp?' + params.toString());
                    const data = await response.json();
                    this.airTempAnomalies = JSON.parse(data.replace(/\bNaN\b/g, "null"))
                    //eventBus.$emit('treshold_anomalies', this.instrumentAnomalies);
                }
                if(this.selectedColumn == 'OilTemp'){
                    const params = new URLSearchParams();
                    const value = 'OilTempAnomaly_' + this.train_id +'.json'
                    params.append('fileName', value);
                    const response = await fetch('http://localhost:3000/getFileOilTemp?' + params.toString());
                    const data = await response.json();
                    this.oilTempAnomalies = JSON.parse(data.replace(/\bNaN\b/g, "null"))
                    //eventBus.$emit('treshold_anomalies', this.instrumentAnomalies);
                }

                if(this.selectedColumn == 'WatTemp'){
                    const params = new URLSearchParams();
                    const value = 'WatTempAnomaly_' + this.train_id +'.json'
                    params.append('fileName', value);
                    const response = await fetch('http://localhost:3000/getFileWatTemp?' + params.toString());
                    const data = await response.json();
                    this.watTempAnomalies = JSON.parse(data.replace(/\bNaN\b/g, "null"))
                    //eventBus.$emit('treshold_anomalies', this.instrumentAnomalies);
                }
                this.selectedItem = 0;
            }catch(error){
                console.error('Error fetching temp file name :', error);
            }
        },
        createChart() {
            if(this.selectedColumn == 'Air temperature' && this.airTempAnomalies.content){
                this.createChartData(this.airTempAnomalies.content[this.selectedItem])
            }

            if(this.selectedColumn == 'OilTemp' && this.oilTempAnomalies.content){
                this.createChartData(this.oilTempAnomalies.content[this.selectedItem])
            }

            if(this.selectedColumn == 'WatTemp' && this.watTempAnomalies.content){
                this.createChartData(this.watTempAnomalies.content[this.selectedItem])
            }
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
}

</script>