<template>
    <div v-if="center.length>0">
        <l-map style="height: 300px; width:100% ;" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="center"></l-marker>
        </l-map>
    </div>
</template>
  
<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker
    },
    props: {
        center: Array
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            zoom: 15,
        };
    },

}
</script>
  