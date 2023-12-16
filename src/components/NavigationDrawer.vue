<template>
    <v-navigation-drawer>
        <v-list>
            <v-list-item v-for="(value, key) in files" :key="key" @click="handleItemClick(value)">
                <v-list-item-content>
                    <v-list-item-title>Train {{ extractNumber(value) }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script>
import eventBus from '../vuex/eventbus';
export default {
    data() {
        return {
            files: [],
            instrumentAnomalies: [],
        };
    },
    created() {
        this.fetchFileNames();
    },
    methods: {
        async fetchFileNames() {
            try {
                const response = await fetch('http://localhost:3000/getFiles');
                const data = await response.json();
                this.files = data.files;
            } catch (error) {
                console.error('Error fetching file names:', error);
            }
        },
        
        extractNumber(fileName) {
            const match = fileName.match(/\d+/);
            return match ? match[0] : '';
        },
        async handleItemClick(value) {
            const params = new URLSearchParams();
            params.append('fileName', value);
            const response = await fetch('http://localhost:3000/getFile?' + params.toString());
            const data = await response.json();
            this.instrumentAnomalies = JSON.parse(data.replace(/\bNaN\b/g, "null"))
            eventBus.$emit('inst_anomales', this.instrumentAnomalies);
            eventBus.$emit('train_id', this.extractNumber(value));

           
        }
    },
};
</script>
<style scoped>
/* Hide scrollbar */
.v-navigation-drawer .v-navigation-drawer__content {
    overflow: hidden;
}

/* Make list items clickable */
.v-list-item:hover {
    cursor: pointer;
}
</style>
  