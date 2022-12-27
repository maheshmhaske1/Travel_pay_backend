const mongoose = require("mongoose");


const User_Schema = new mongoose.Schema(
  {
    AIRPORTCODE: {
      type: String,
    //   index:true
    },
    AIRPORTNAME: {
        type: String,
        // index:true
    },
    CITYCODE: {
        type: String,
        // index:true
    },
    CITYNAME: {
        type: String,
        // index:true
      default:null

    },
    COUNTRYNAME:{
      type:String,
      default:null

      
    },
    CURRENCYCODE:{
      type:String,
      default:null
    }
  },
  {
    timestamps: true,
  }
);
var StationaryMasterModule = mongoose.model(
  "flights_details",
  User_Schema
);
module.exports = StationaryMasterModule;
