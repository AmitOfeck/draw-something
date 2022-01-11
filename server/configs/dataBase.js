var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gamesDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})