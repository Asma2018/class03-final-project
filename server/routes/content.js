var express = require('express');
var router = express.Router();

var knex  = require('../helpers/knex');

/* GET category listing. */
router.post('/content', function(req, res, next) {
  knex('contents').insert({
    categories: req.body.categories,
    description:req.body.description,
    difficulty:req.body.difficulty,
    link:req.body.link,
    title:req.body.title,
    type:req.body.type
  })
  .then(function (result){
    res.json({ success: true, message: 'ok' });
    res.send(result);
  })
});

module.exports = router;
