<template>
<div>   
    <div>
        <state-summary v-bind:states="states"></state-summary>
    </div>
   <div class="state-list-container">
        <div class="state-container" v-for="state in states" v-bind:key="state.name">
           <state-detail 
           v-bind:state="state"
           v-on:update-visited="updateVisited"
           ></state-detail>
        </div>
    </div>
</div>  
</template>

<script>
import StateDetail from './StateDetail.vue'
import StateSummary from './StateSummary'

export default {
  components: { 
      StateDetail,
      StateSummary,
    StateSummary 
      },
    name: 'StateList',
    data() {
        return {
            states: []
        }
    },
    mounted() {
        this.fetchAllStates()
    },
    methods: {
        fetchAllStates() {
            this.$stateService.getAllStates().then( states => {
                this.states = states
            }).catch( err => {
                alert('Sorry, can\'t fetch state list')
                console.error(err)
            })
        },
        updateVisited(stateName, visited) {
            this.$stateService.setVisited(stateName, visited).then( () => {
                this.fetchAllStates()
            })
            .catch( err => {
                alert('Sorry, can\'t update state')
                console.error(err)
            })
        }
    }
}

</script>

<style scoped>

.state-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.state-container {
    margin: 1rem;
}

</style>