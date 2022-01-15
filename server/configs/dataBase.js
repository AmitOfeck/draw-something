var mongoose = require('mongoose');

require('dotenv').config()

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/gamesDB'

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})