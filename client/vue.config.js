module.exports = {
    devServer: {
        //vue client will make requests to /api/states
        //when server is running, it will make requests to 
        //'http://127.0.0.1:3000/api/states'
        proxy: 'http://127.0.0.1:3000'
    }
}