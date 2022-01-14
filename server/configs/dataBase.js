require("dotenv").config(); 
var mongoose = require('mongoose');
const MongoDbUrl = process.env.PRODUCTION === "True" ? process.env.MONGODB_URL : 'mongodb://localhost:27017/gamesDB'
console.log(MongoDbUrl)


mongoose.connect(MongoDbUrl ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})