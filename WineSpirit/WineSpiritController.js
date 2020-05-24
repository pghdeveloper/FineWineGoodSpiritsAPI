var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var axios = require("axios");
//var url = "https://data.pa.gov/resource/fhz7-8ncd.json"
var cors = require('cors');
const {getCounties} = require('./counties-service');
const {getSalesDetails} = require('./sales-service');
const {sortSalesDetails} = require('./sales-service');
const { makeError } = require('./errors.js');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//router get
router.get('/:county', cors(), async (req, res, next) => {
    try {
        res.contentType('application/json');
        var countyResponse = await getSalesDetails(req.params.county);
        if (countyResponse.data === undefined || countyResponse.data.length == 0)
        {
          next(makeError('County does not exist', 404));
        }
        res.send(await sortSalesDetails(countyResponse.data));
      } catch (error) {
        console.log(error);
      }
});

router.get('/counties/all', cors(), async (req, res, next) => {
  try {
      res.contentType('application/json');
      res.send(await getCounties());
    } catch (error) {
      console.log(error);
    }
});
module.exports = router;