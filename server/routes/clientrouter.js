//All client routing handles will be here

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Client');
})

module.exports = router;