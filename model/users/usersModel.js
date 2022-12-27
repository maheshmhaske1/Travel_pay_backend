const mongoose = require("mongoose");


const User_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    //   index:true
    },
    email: {
        type: String,
        // index:true
    },
    mobile_number: {
        type: String,
        // index:true
    },
    password: {
        type: String,
        // index:true
    },
    type:{
      type:String,
      default:"normal"
    },
    facebook_id:{
      type:Number,
      default:null
    }
  },
  {
    timestamps: true,
  }
);
var StationaryMasterModule = mongoose.model(
  "users",
  User_Schema
);
module.exports = StationaryMasterModule;
