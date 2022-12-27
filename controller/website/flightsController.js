var axios = require("axios");
const moment = require("moment");
require("dotenv").config();
// var data = require("../data");
var f = require("../../model/users/fligts_deatils");

// inValid Departure Time in 1st segment. Please follow one of the time format from (AnyTime - '00:00:00', Morning - '08:00:00', AfterNoon - '14:00:00', Evening - '19:00:00', Night - '01:00:00') list.

exports.get_flights_data = async (req, res) => {
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
          PreferredDepartureTime:proposedDate1 ,
          PreferredArrivalTime: proposedDate1,
        },
        {
          Origin: req.body.where_to,
          Destination: req.body.where_form,
          FlightCabinClass: req.body.economy,
          PreferredDepartureTime:  proposedDate1,
          PreferredArrivalTime:  proposedDate1,
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

// -----------get_flights_data_farequote---------------//
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

// --------select destination-------------------------//
exports.get_destination = async (req, res) => {
  console.log(req.body);
  var data = {
    EndUserIp: "152.57.198.215",
    TokenId: process.env.token_id,
    CountryCode: req.body.country,
    SearchType: "1",
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/SharedServices/StaticData.svc/rest/GetDestinationSearchStaticData",
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

//  --------------search hotel----------------------//
exports.search_hotel = async (req, res) => {
  console.log(req.body);
  var in_date = moment(req.body.inputCheckIn).format("DD/MM/YYYY");
  var out_date = moment(req.body.inputCheckOut).format("DD/MM/YYYY");
  var star = "";
  var star1 = "";

  if (req.body.star == null || req.body.star == "") {
    star = 5;
    star1 = 0;
  } else {
    star = req.body.star;
    star1 = req.body.star;
  }
  var data = {
    CheckInDate: in_date,
    NoOfNights: "1",
    CountryCode: req.body.country,
    CityId: req.body.destination,
    ResultCount: null,
    PreferredCurrency: "INR",
    GuestNationality: "IN",
    NoOfRooms: req.body.room,
    RoomGuests: [
      {
        NoOfAdults: req.body.adult,
        NoOfChild: req.body.children,
        ChildAge: null,
      },
    ],
    MaxRating: star,
    MinRating: star1,
    ReviewScore: null,
    IsNearBySearchAllowed: false,
    EndUserIp: "152.57.198.215",
    TokenId: process.env.token_id,
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Hotel/hotelservice.svc/rest/GetHotelResult/",
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
        message: "Get hotel data",
      });
    })
    .catch(function (error) {
      console.log(error);
      return res.json({
        status: false,
        message: "Issue",
        data: error,
      });
    });
};

//  ----------------load_bus_city----------------//
exports.load_bus_city = async (req, res) => {
  console.log(req.body);
  var data = {
    TokenId: process.env.token_id,
    IpAddress: "152.57.198.215",
    ClientId: "ApiIntegrationNew",
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/SharedServices/StaticData.svc/rest/GetBusCityList",
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
        message: "Get bus city data",
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

// -----------load_bus--------------//
exports.load_bus = async (req, res) => {
  // var travel_date = moment(req.body.travel_date_bus, "DD/MM/YYYY");
  var in_date = moment(req.body.travel_date_bus).format("YYYY-MM-DD");
  console.log(in_date);

  console.log(req.body);
  var data = {
    DateOfJourney: in_date,
    DestinationId: req.body.bus_form,
    EndUserIp: "152.57.198.215",
    OriginId: req.body.bus_to,
    TokenId: process.env.token_id,
    PreferredCurrency: "INR",
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Bus/Busservice.svc/rest/Search",
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
        message: "Get bus  data",
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

// -------------book_flights-------------//

exports.book_flights = async (req, res) => {
  console.log(req.body);

  var data1 = {
    PreferredCurrency: null,
    ResultIndex: req.body.code,
    AgentReferenceNo: "sonam1234567890",
    Passengers: req.body.passenger,
    EndUserIp: "192.168.11.58",
    TokenId: process.env.token_id,
    TraceId: req.body.TraceId,
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Ticket",
    headers: {
      "Content-Type": "application/json",
    },
    data: data1,
  };

  // console.log(data1);

  axios(config)
    .then(function (response) {
      // console.log("jkjks", response);
      return res.json({
        status: true,
        data: response.data,
        message: "Get ticket data",
      });
    })
    .catch(function (error) {
      console.log("issue", error);
      return res.json({
        status: false,
        message: "Issue",
        data: error,
      });
    });
};

// ----search_sightseeing------------------//
exports.search_sightseeing = async (req, res) => {
  var form = moment(req.body.inputCheckIn).format("YYYY-MM-DD"); // store localTime
  var form1 = form + "T00:00:00";
  var to = moment(req.body.inputCheckOut).format("YYYY-MM-DD"); // store localTime
  var to1 = to + "T00:00:00";

  console.log(req.body);
  var data = {
    CityId: req.body.country_id,
    CountryCode: req.body.country,
    FromDate: form1,
    ToDate: to1,
    AdultCount: req.body.adult,
    ChildCount: req.body.children,
    ChildAge: null,
    PreferredLanguage: 0,
    PreferredCurrency: "INR",
    IsBaseCurrencyRequired: false,
    Sources: null,
    EndUserIp: "192.168.5.56",
    TokenId: process.env.token_id,
    ClientId: "ApiIntegrationNew",
    KeyWord: "",
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_SightSeeing/SightseeingService.svc/rest/Search",
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
        message: "Get bus city data",
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
// ---------search data ------------//
exports.search_flights = (req, res) => {
  data.map((map) => {
    new f({
      AIRPORTCODE: map.AIRPORTCODE,
      AIRPORTNAME: map.AIRPORTNAME,
      CITYCODE: map.CITYCODE,
      CITYNAME: map.CITYNAME,
      COUNTRYNAME: map.COUNTRYNAME,
      CURRENCYCODE: map.CURRENCYCODE,
    })
      .save()
      .then((data) => {
        return res.json({
          status: true,
          data: data,
          message: "User Register Successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          status: false,
          data: err,
          message: "Something Went Wrong..!",
        });

        next(err);
      });
  });

  // const filters = req.query;
  // const filteredUsers = data.filter(user => {
  //     let isValid = true;
  //     for (key in filters) {
  //         console.log(key, user[key], filters[key]);
  //         isValid = isValid && user[key] == filters[key];
  //     }
  //     return isValid;
  // });
  // res.send(filteredUsers);
};

exports.get_data_flights = (req, res) => {
  f.find().then((data) => {
    return res.json({
      data: data,
    });
  });
};

// -------get_hotel_info------------------//
exports.get_hotel_info = async (req, res) => {
  console.log(req.body);
  var data = {
    ResultIndex: req.body.hotel_result,
    HotelCode: req.body.hotel_code,
    EndUserIp: "152.57.198.215",
    TokenId: process.env.token_id,
    TraceId: req.body.trace_id,
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Hotel/hotelservice.svc/rest/GetHotelInfo",
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
        message: "Get hotel info  data",
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

// --------------get_hotel_room------------//
exports.get_hotel_room = async (req, res) => {
  console.log(req.body);
  var data = {
    ResultIndex: req.body.hotel_result,
    HotelCode: req.body.hotel_code,
    EndUserIp: "152.57.198.215",
    TokenId: process.env.token_id,
    TraceId: req.body.trace_id,
  };

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Hotel/hotelservice.svc/rest/GetHotelRoom",
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
        message: "Get hotel room  data",
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

// -----------BlockRoomHotel-----------------//
exports.BlockRoomHotel = async (req, res) => {
  console.log(req.body);
  var data = {
    ResultIndex: req.body.hotel_result,
    HotelCode: req.body.hotel_code,
    HotelName: req.body.hotel_name,
    GuestNationality: "IN",
    NoOfRooms: "1",
    ClientReferenceNo: "0",
    IsVoucherBooking: "true",
    HotelRoomsDetails: [
      {
        RoomIndex: req.body.RoomIndex,
        RoomTypeCode: req.body.RoomTypeCode,
        RoomTypeName: req.body.RoomTypeName,
        RatePlanCode: req.body.RatePlanCode,
        BedTypeCode: null,
        SmokingPreference: 0,
        Supplements: null,
        Price: {
          CurrencyCode: req.body.CurrencyCode,
          RoomPrice: req.body.RoomPrice,
          Tax: req.body.Tax,
          ExtraGuestCharge: 0.0,
          ChildCharge: req.body.ChildCharge,
          OtherCharges: req.body.OtherCharges,
          Discount: req.body.Discount,
          PublishedPrice: req.body.PublishedPrice,
          PublishedPriceRoundedOff: req.body.PublishedPriceRoundedOff,
          OfferedPrice: req.body.OfferedPrice,
          OfferedPriceRoundedOff: req.body.OfferedPriceRoundedOff,
          AgentCommission: req.body.AgentCommission,
          AgentMarkUp: req.body.AgentMarkUp,
          ServiceTax: req.body.ServiceTax,
          TCS: req.body.TCS,
          TDS: req.body.TDS,
          ServiceCharge: req.body.ServiceCharge,
          TotalGSTAmount: req.body.TotalGSTAmount,
          GST: {
            CGSTAmount: 0.0,
            CGSTRate: 0,
            CessAmount: 17.14,
            CessRate: 10.0,
            IGSTAmount: 31.42,
            IGSTRate: 18,
            SGSTAmount: 0.0,
            SGSTRate: 0,
            TaxableAmount: 173.54,
          },
        },
      },
    ],
    EndUserIp: "152.57.198.215",
    TokenId: process.env.token_id,
    TraceId: req.body.trace_id,
  };
  console.log(data);

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Hotel/hotelservice.svc/rest/BlockRoom",
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
        message: "Get hotel room  data",
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

// ------------book_hotel--------------------
exports.book_hotel = async (req, res) => {
  console.log(req.body);
  var data = {
    ResultIndex: req.body.hotel_result,
    HotelCode: req.body.hotel_code,
    HotelName: req.body.hotel_name,
    GuestNationality: "IN",
    NoOfRooms: "1",
    ClientReferenceNo: "0",
    IsVoucherBooking: "true",
    HotelRoomsDetails: [
      {
        RoomIndex: req.body.RoomIndex,
        RoomTypeCode: req.body.RoomTypeCode,
        RoomTypeName: req.body.RoomTypeName,
        RatePlanCode: req.body.RatePlanCode,
        BedTypeCode: null,
        SmokingPreference: 0,
        Supplements: null,
        Price: {
          CurrencyCode: req.body.CurrencyCode,
          RoomPrice: req.body.RoomPrice,
          Tax: req.body.Tax,
          ExtraGuestCharge: 0.0,
          ChildCharge: req.body.ChildCharge,
          OtherCharges: req.body.OtherCharges,
          Discount: req.body.Discount,
          PublishedPrice: req.body.PublishedPrice,
          PublishedPriceRoundedOff: req.body.PublishedPriceRoundedOff,
          OfferedPrice: req.body.OfferedPrice,
          OfferedPriceRoundedOff: req.body.OfferedPriceRoundedOff,
          AgentCommission: req.body.AgentCommission,
          AgentMarkUp: req.body.AgentMarkUp,
          ServiceTax: req.body.ServiceTax,
          TCS: req.body.TCS,
          TDS: req.body.TDS,
          ServiceCharge: req.body.ServiceCharge,
          TotalGSTAmount: req.body.TotalGSTAmount,
          GST: {
            CGSTAmount: 0.0,
            CGSTRate: 0,
            CessAmount: 17.14,
            CessRate: 10.0,
            IGSTAmount: 31.42,
            IGSTRate: 18,
            SGSTAmount: 0.0,
            SGSTRate: 0,
            TaxableAmount: 173.54,
          },
        },
        HotelPassenger: [
          {
            Title: "mr",
            FirstName: "GTA",
            Middlename: null,
            LastName: "Service",
            Phoneno: null,
            Email: null,
            PaxType: 1,
            LeadPassenger: true,
            Age: 0,
            PassportNo: null,
            PassportIssueDate: "0001-01-01T00: 00: 00",
            PassportExpDate: "0001-01-01T00: 00: 00",
            PAN: "EBQPS3333T",
          },
        ],
      },
    ],
    EndUserIp: "152.57.198.215",
    TokenId: process.env.token_id,
    TraceId: req.body.trace_id,
  };
  console.log(data);

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Hotel/hotelservice.svc/rest/Book",
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
        message: "Get hotel room  data",
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

// -------------boarding_bus------------------//
exports.boarding_bus = async (req, res) => {
  console.log(req.body);
  var data = {
    EndUserIp: "192.168.5.37",
    ResultIndex: req.body.result_id,
    TraceId: req.body.tracker_id,
    TokenId: process.env.token_id,
  };
  console.log(data);

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Bus/Busservice.svc/rest/GetBoardingPointDetails",
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
        message: "Get hotel room  data",
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

// -------------boarding_bus------------------//
exports.sightseeing_block = async (req, res) => {
  
    console.log(req.body);
    var data = {
      EndUserIp: "192.168.5.37",
      ResultIndex: req.body.result_id,
      TraceId: req.body.trace_id,
      TokenId: process.env.token_id,
      TourIndex: 1,
      AgeBands: [
        {
          AgeBandIndex: 1,
          BandDescription: "Adult",
          BandQuantity: 1,
          IsAgeRequired: false,
          MaximumCount: 0,
          MinimumCount: 0,
        },
      ],
    };
    console.log("........".data);

    var config = {
      method: "post",
      url: "http://api.tektravels.com/BookingEngineService_SightSeeing/SightseeingService.svc/rest/Block",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    // console.log(data)

    axios(config)
      .then(function (response) {
        return res.json({
          status: true,
          data: response.data,
          message: "Get sightseeing block",
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

// --------------------sightseeing_book----------------//
exports.sightseeing_book = async (req, res) => {
  console.log(req.body);
  var data = {
    SightseeingCode: req.body.sightseeing_id,
    TourLanguages: "",
    Passenger: [
      {
        Title: "Miss.",
        FirstName: "Richa",
        LastName: "Mishra",
        PaxType: 0,
        Age: null,
        LeadPassenger: true,
        Phoneno: "9876543210",
        PassportNo: "",
        Email: "test@gmail.com",
        AgeBandIndex: 1,
        PAN: "CGMPM8765N",
        PaxId: 0,
        DateOfBirth: "",
      },
    ],
    GuestNationality: "IN",
    IsVoucherBooking: true,
    IsBaseCurrencyRequired: false,
    IsCorporate: false,

    TourIndex: 1,
    EndUserIp: "192.168.5.56",
    ResultIndex: req.body.result_id,
    TraceId: req.body.trace_id,
    TokenId: process.env.token_id,
  };

  console.log(data);

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_SightSeeingBook/SightseeingService.svc/rest/Book",
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
        message: "Get hotel room  data",
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

// -------------book bus------------------//
exports.book_bus = async (req, res) => {
  console.log(req.body);
  var data = {
    EndUserIp: "192.168.5.37",
    ResultIndex: req.body.result_id,
    TraceId: req.body.tracker_id,
    TokenId: process.env.token_id,
    BoardingPointId: req.body.b,
    DropingPointId: req.body.d,
    Passenger: [
      {
        LeadPassenger: true,
        PassengerId: 0,
        Title: "Mr.",
        Address: "delhi",
        Age: 12,
        Email: "akshit@travelboutiqueonline.com",
        FirstName: "akshit",
        Gender: 1,
        IdNumber: null,
        IdType: null,
        LastName: "dhameja",
        Phoneno: "01234567890",
        Seat: {
          ColumnNo: "005",
          Height: 1,
          IsLadiesSeat: false,
          IsMalesSeat: false,
          IsUpper: false,
          RowNo: "000",
          SeatIndex: "5",
          SeatName: "5",
          SeatStatus: true,
          SeatType: 1,
          Width: 1,
          Price: {
            CurrencyCode: "INR",
            BasePrice: 10.1,
            Tax: 0.0,
            OtherCharges: 0.0,
            Discount: 0.0,
            PublishedPrice: 10.1,
            PublishedPriceRoundedOff: 10.0,
            OfferedPrice: 9.6,
            OfferedPriceRoundedOff: 10.0,
            AgentCommission: 0.5,
            AgentMarkUp: 0.0,
            TDS: 0.15,
            GST: {
              CGSTAmount: 0.0,
              CGSTRate: 0.0,
              CessAmount: 0.0,
              CessRate: 0.0,
              IGSTAmount: 0.0,
              IGSTRate: 12.0,
              SGSTAmount: 0.0,
              SGSTRate: 0.0,
              TaxableAmount: 0.0,
            },
          },
        },
      },
    ],
  };

  console.log(data);

  var config = {
    method: "post",
    url: "http://api.tektravels.com/BookingEngineService_Bus/Busservice.svc/rest/Book",
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
        message: "Get hotel room  data",
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



// -------------boarding_bus------------------//
exports.sightseeing_get_ability = async (req, res) => {
    console.log(req.body)
    var data = {
      ResultIndex: req.body.result_id,
      TraceId: req.body.trace_id,
      TokenId: process.env.token_id,
      EndUserIp: "192.168.5.37",
    };
  
    var config = {
      method: "post",
      url: "http://api.tektravels.com/BookingEngineService_SightSeeing/SightseeingService.svc/rest/GetAvailability",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(data)
    axios(config)
    .then(function (response) {
      return res.json({
        status: true,
        data: response.data,
        message: "Get hotel room  data",
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
  