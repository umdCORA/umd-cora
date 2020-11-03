//All database connections are here
var properties = require('./properties');
var mongoose = require('mongoose');


module.exports = function(){
    mongoose.connect(properties.DB,{
        poolSize: 1,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    
    mongoose.connection.on('connected', function(){
        console.log('Successful connection to ' + properties.DB);
    })

    mongoose.connection.on('error', function(err){
        console.log('MongoDB error');
    })

    mongoose.connection.on('disconnected', function(){
        console.log('MongoDB disconnection')
    })
};