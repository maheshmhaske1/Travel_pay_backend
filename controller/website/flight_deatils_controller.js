var axios = require("axios");
const moment = require("moment");
require("dotenv").config();




exports.search_flight_data = async (req, res) => {
    console.log(req.body);

    var localTime = moment(req.body.departure_date).format("YYYY-MM-DD"); // store localTime
    var proposedDate = localTime + "T00:00:00";

    console.log("proposedDate", proposedDate);

    var localTime1 = moment(req.body.return_date).format("YYYY-MM-DD"); // store localTime
    var proposedDate1 = localTime1 + "T00:00:00";

    console.log("proposedDate", proposedDate1);

    var direct = "";
    var one_stop = "";
    if (
        req.body.direct == null ||
        req.body.direct == "false" ||
        req.body.direct == false
    ) {
        direct = false;
    } else {
        direct = true;
    }
    if (
        req.body.one_stop == null ||
        req.body.one_stop == "false" ||
        req.body.one_stop == false
    ) {
        one_stop = false;
    } else {
        one_stop = true;
    }

    var airline1 = [];

    if (req.body.airline != null) {
        airline1.push(req.body.airline);
    }
    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    if (req.body.return_date != "" || req.body.return_date != null) {
        var date3 = convert(req.body.return_date);
        var return_date = moment(date3).toDate();
    }
    var date4 = convert(req.body.departure_date);
    var departure_date = moment(date4).toDate();
    console.log("req.body.type", req.body.type);
    var data = "";

    if (req.body.type === "1") {
        data = {
            EndUserIp: "152.57.198.215",
            TokenId: process.env.token_id,
            AdultCount: req.body.passenger,
            ChildCount: req.body.child_f,
            InfantCount: "0",
            DirectFlight: direct,
            OneStopFlight: one_stop,
            JourneyType: req.body.type,
            PreferredAirlines: airline1,
            Segments: [
                {
                    Origin: req.body.where_form,
                    Destination: req.body.where_to,
                    FlightCabinClass: req.body.economy,
                    PreferredDepartureTime: proposedDate,
                    PreferredArrivalTime: proposedDate,
                },
            ],
            Sources: null,
        };
    } else if ((req.body.type = "2")) {
        data = {
            EndUserIp: "152.57.198.215",
            TokenId: process.env.token_id,
            AdultCount: req.body.passenger,
            ChildCount: req.body.child_f,
            InfantCount: "0",
            DirectFlight: direct,
            OneStopFlight: one_stop,
            JourneyType: req.body.type,
            PreferredAirlines: airline1,
            Segments: [
                {
                    Origin: req.body.where_form,
                    Destination: req.body.where_to,
                    FlightCabinClass: req.body.economy,
                    PreferredDepartureTime: proposedDate1,
                    PreferredArrivalTime: proposedDate1,
                },
                {
                    Origin: req.body.where_to,
                    Destination: req.body.where_form,
                    FlightCabinClass: req.body.economy,
                    PreferredDepartureTime: proposedDate1,
                    PreferredArrivalTime: proposedDate1,
                },
            ],
            Sources: null,
        };
    } else {
    }

    var config = {
        method: "post",
        url: "http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };

    console.log(data);

    axios(config)
        .then(function (response) {
            return res.json({
                status: true,
                data: response.data,
                message: "Get Flights data",
            });
        })
        .catch(function (error) {
            // console.log(error);
            return res.json({
                status: false,
                message: "Issue",
                data: error,
            });
        });
};



exports.get_flights_data_farequote = async (req, res) => {
  console.log(req.body);
  var data = {
    EndUserIp: "152.57.198.215",
    TokenId: process.env.token_id,
    TraceId: req.body.tracker_id,
    ResultIndex: req.body.resultid,
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/FareQuote",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  console.log(data);

  axios(config)
    .then(function (response) {
      return res.json({
        status: true,
        data: response.data,
        message: "Get Flights data",
      });
    })
    .catch(function (error) {
      // console.log(error);
      return res.json({
        status: false,
        message: "Issue",
        data: error,
      });
    });
};