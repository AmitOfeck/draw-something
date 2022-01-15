var mongoose = require('mongoose');

require('dotenv').config()

const mongoReomoteUrl = "mongodb+srv://amitofeck:080300@cluster0.ornxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const localurl = 'mongodb://localhost:27017/gamesDB'

mongoose.connect(mongoReomoteUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})