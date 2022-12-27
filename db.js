const mongoose = require('mongoose')

let conn = mongoose.connect('mongodb+srv://vicky:Vicky123@cluster0.ga62n.mongodb.net/youtube?retryWrites=true&w=majority')
conn.then(con => {
    console.log("Connected...")
})
    .catch(error => {
        console.log(error)
    })


    