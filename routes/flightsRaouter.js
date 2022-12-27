var express = require('express');
var router = express.Router();
const flightsController = require("../controller/website/flightsController")
const flight_details_controller = require("../controller/website/flight_deatils_controller")



// ----------Load flights data-----------//
router.post("/get_flights_data",flightsController.get_flights_data)

// --------get_flights_data_farequote--------//
router.post("/get_flights_data_farequote",flightsController.get_flights_data_farequote)

// -------------get_destination-------------------//
router.post("/get_destination",flightsController.get_destination)

// ------search_hotel----------------------//
router.post("/search_hotel",flightsController.search_hotel)

// ----------load_bus_city------------------//
router.post("/load_bus_city",flightsController.load_bus_city)

// --------load_bus------------------//
router.post("/load_bus",flightsController.load_bus)

// --------get_hotel_info-----------//
router.post("/get_hotel_info",flightsController.get_hotel_info)

// ---------------get_hotel_room----------//
router.post("/get_hotel_room",flightsController.get_hotel_room)

// ---------------book_flights-------------//
router.post("/book_flights",flightsController.book_flights)
// --------search_sightseeing-------------//
router.post("/search_sightseeing",flightsController.search_sightseeing)

// -------------BlockRoomHotel-------------------//
router.post("/BlockRoomHotel",flightsController.BlockRoomHotel)

// --------------book_hotel-----------------------//
router.post("/book_hotel",flightsController.book_hotel)
// -----------boarding_bus-----------------------//
router.post("/boarding_bus",flightsController.boarding_bus)
// -----------book_bus---------------------//
router.post("/book_bus",flightsController.book_bus)

// ----------sightseeing_block--------------//
router.post("/sightseeing_block",flightsController.sightseeing_block)

// ------------sightseeing_get_ability---------//
router.post("/sightseeing_get_ability",flightsController.sightseeing_get_ability)


// ------------sightseeing_book------------//
router.post("/sightseeing_book",flightsController.sightseeing_book)











router.get("/search_flights",flightsController.search_flights)


router.get("/get_data_flights",flightsController.get_data_flights)


// -------------new apis---------------------------------------//


// ------------flight_details_controller---------------------//
router.post("/search_flight_data",flight_details_controller.search_flight_data)

// -------------get_flights_data_farequote--------------------------//
router.post("/get_flights_farequote_data",flight_details_controller.get_flights_data_farequote)




module.exports = router;
