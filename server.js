let express = require('express')
let states_api = require('./routes/states')
let path = require('path') //path library

let app = express()

//create path variable - joining location of code plus the client and dist directories
//makes path/location on computer that runs the code. where vue app is
let vueAppPath = path.join(__dirname, 'client', 'dist') 
app.use(express.static(vueAppPath)) //requests to the application will return the serve the files in this directory (index.html) - how site will be visible

app.use(express.json())

app.use('/api', states_api)

app.use(function(req, res, next) {
    res.status(404).send('Not found :(')
})

app.use(function(err, req, res, next) {
    console.log(err)
    res.status(500).send('Server error')
})

let server = app.listen(process.env.PORT || 3000, function() {
    console.log('server running on port', server.address().port)
})