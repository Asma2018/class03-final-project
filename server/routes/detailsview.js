var express = require('express');
var router = express.Router();

var knex  = require('../helpers/knex');


router.get('/', function(req, res, next) {
  knex('contents').select().then( function(data) {
    res.send(data);
    
  });
});

module.exports = router;