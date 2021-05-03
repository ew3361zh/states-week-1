import axios from 'axios'

export default {
    getAllStates() {
        return axios.get('/api/states').then( response => {
            // return list of state objects
            return response.data
        })
    },

    setVisited(stateName, visited) {
        //example request to api/states/Wisconsin
        let requestData = {visited: visited}
        return axios.patch('/api/states/' + stateName, requestData).then( response => {
            return response.data //when axios makes a request, 
            //it will check the status code of the response, 
            // if it's 200, it will know it's successful and return data
        
        })
    },

    getOneState(stateName) {
        return axios.get('/api/state/' + stateName).then( response => {
            return response.data
        })
    }
}