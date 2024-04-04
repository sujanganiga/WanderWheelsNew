const mongoose = require("mongoose");
//'mongodb+srv://sathya:sathyapr@cluster0.dkuc0.mongodb.net/sheycars-udemy'
// mongodb+srv://admin1:admin1@cluster0.6stepc4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://admin1:<password>@cluster0.6stepc4.mongodb.net/wanderwheels-testing
//mongodb+srv://admin1:<password>@cluster0.6stepc4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

function connectDB(){

    mongoose.connect('mongodb+srv://admin1:admin1@cluster0.6stepc4.mongodb.net/wanderwheels-testing', {useUnifiedTopology: true , useNewUrlParser: true})
    
    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose