var express = require('express');
var router = express.Router();
const path = require("path");

// /* GET home page. */

router.get('/', async (req, res) => {

  res.end('<h1>Challenge Mercado Libre</h1><h3>Backend</h3\n');

})

module.exports = router;
