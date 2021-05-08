let express = require('express')
let States = require('../models').States

let router = express.Router()

//fetch all the states
router.get('/states', function(req, res, next) {
    States.findAll({ order: ['name']}).then( states => {
        return res.json(states)
    })
    .catch( err => next(err))
})

// fetch a single state's whole information
router.get('/state/:name', function(req, res, next){
    let stateName = req.params.name
    States.findOne( {where: {name: stateName}})
    .then( state => {
        if (state) {
            return res.json(state)
        } else {
            return res.status(404).send('State not found')
        }
    })
    .catch( err => next(err) )
})

// fetch a list of states visited
router.get('/states/visited', function(req, res, next){
    States.findAll({where: {visited: true}}) //find all states where visited = true
    .then( states => {
        return res.json(states)
    })
    .catch( err => next(err))
})

//patch route to update a state with visited/not status
router.patch('/states/:name', function(req, res, next){
    let stateName = req.params.name
    let stateVisited = req.body.visited //getting the visited status for the particular state

    States.update( { visited: stateVisited }, {where: { name: stateName}})
    .then( rowsUpdated => { //information about what was updated in the database
        let numberOfRowsUpdated = rowsUpdated[0]
        if (numberOfRowsUpdated == 1) {
            return res.send('success ok!') //returns by default status code 200
        }
        return res.status(404).send('State not found') //array is empty meaning no state matching the name
    })
    .catch( err => next(err)) //not user error, pass this on to general error handler
})

module.exports = router