const mongoose = require("mongoose") 
// const client = require('../db.js')

const con = mongoose.connect("mongodb+srv://vicky:Vicky123@cluster0.ga62n.mongodb.net/youtube?retryWrites=true&w=majority")

    .then(success => {
        console.log('database connected')
    })
    .catch(error => {
        console.log("error while connecting database", error)
    })