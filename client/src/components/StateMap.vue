<template>
    <div class="state-map">
        <h2>The state of {{ state.name }}</h2>

        <p v-if="state.visited">You have visited this state</p>
        <p v-else>You have not yet visited this state</p>

        <div id="map-container" v-if="dataReady">
            <l-map ref="map" v-on:ready="onMapReady" v-bind:center="mapCenter" v-bind:zoom="state.zoom">
                <l-tile-layer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors">
                </l-tile-layer>
            </l-map>
        </div>

    </div>
</template>

<script>

import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
    name: 'StateMap',
    components: {
        LMap, LTileLayer
    },
    data() {
        return {
            state: {},
            dataReady: false, //used to track if data is ready, start as false, when api call is complete, change to true
            mapReady: false //used to track if map is ready, when map is loaded, set to true
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
                this.dataReady = true //we know data is fetched by this point so can change property to true
            }).catch( err => {
                //404
                if (err.response && err.response.status === 404) {
                    // this.state.name = '?' // todo think aout a better way to communicate to the user
                    this.$router.push({name: 'NotFound'})
                } else {
                    //500 server error
                    alert('Sorry, error fetching data about this state') //msg for user
                    console.error(err) //for the developer
                }
            })
        },
        onMapReady() {
            this.mapReady = true //tied as v-on in l-map element in map-container div
        },
        setMapView() {
            if (this.mapReady && this.dataReady) {
                //todo make sure map shows correct part of world and zoom level
                this.$refs.map.leafletObject.setView(this.mapCenter, this.zoom) //html element with ref map
            }
        }
    },
    computed: {
        mapCenter() {
            return [ this.state.lat, this.state.lon ]
        }
    }
}
</script>

<style scoped>
#map-container {
    height: 30rem;
}
</style>