<template>
    <div class="state-map">
        <h2>The state of {{ state.name }}</h2>

        <p v-if="state.visited">You have visited this state</p>
        <p v-else>You have not yet visited this state</p>

        <div id="map-container">
            <l-map v-bind:center="mapCenter" v-bind:zoom="state.zoom">
                <l-tile-layer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors">
                </l-tile-layer>
            </l-map>
        </div>

    </div>
</template>

<script>

import { LMap, LTileLayer } from'@vue-leaflet/vue-leaflet'

export default {
    name: 'StateMap',
    components: {
        LMap, LTileLayer
    },
    data() {
        return {
            state: {}
        }
    },
    mounted() {
        this.state.name = this.$route.params.state
        this.fetchStateData()
    },
    methods: {
        fetchStateData() {
            this.$stateService.getOneState(this.state.name).then( state => {
                this.state = state 
            })
        }
    }
}
</script>

<style scoped>
#map-container {
    height: 30rem;
}
</style>