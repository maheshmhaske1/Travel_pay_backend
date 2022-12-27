var express = require('express');
const passport = require('passport');
const { redirect } = require('express/lib/response');
var router = express.Router();
require('dotenv').config();
var axios = require('axios');
var request = require('request');


// ---------------home---------------//
router.get('/', function(req, res, next) {
  res.render('website/flight', { base_url:  process.env.base_url });
});

// ---------------hotel---------------//
router.get('/hotel', function(req, res, next) {
  res.render('website/hotel', { base_url:  process.env.base_url });
});

// ---------------bus---------------//
router.get('/bus', function(req, res, next) {
  res.render('website/bus', { base_url:  process.env.base_url });
});

// -----------flights_details-------------------//
router.get('/flights_details', function(req, res, next) {
  res.render('website/flights_search', { base_url:  process.env.base_url });
});


// ----------flight_info.ejs----------------------------//
router.get('/flight_info', function(req, res, next) {
  res.render('website/flight_info', { base_url:  process.env.base_url });
});





module.exports = router;
