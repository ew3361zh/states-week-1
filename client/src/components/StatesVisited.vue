<template>
    <div>
        <h2>List of States You Have Visited</h2>
        <div>
            <p id="none-visited-message" v-if="noneVisited">You have not visited any states!</p>
            <ul class="state-list">
                <li v-for="state in states" v-bind:key="state.name">{{state.name}}</li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    name: 'StatesVisited',
    data() {
        return {
            states: []
        }
    },
    mounted() {
        // make result of calling fetchVisited method available
        this.fetchVisited()
    },
    // get the states visited using the stateService getVisited method and returning that list here
    methods: {
        fetchVisited() {
            this.$stateService.getVisited().then( states => {
                this.states = states
            }).catch( err => {
                alert('Sorry, unable to fetch visited states')
                console.error(err)
            })
        }
    },
    // added a message to the states visited page to show if the user has not visited any states and they navigate to this page
    computed: {
        noneVisited(){
            return this.states.length === 0
        }
    } 
}
</script>


<style scoped>
/* added styles for the list to not have bullets */
    .state-list{
        list-style-type: none;
    }

/* style for if the none-visited message */
    #none-visited-message {
     color: deeppink;
     font-weight: 600;
 }
</style>