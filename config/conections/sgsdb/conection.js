var mongoose = require('mongoose');
mongoose.connect('mongodb://gustavogonda:123456@ds049744.mongolab.com:49744/sgsdb');

module.exports = mongoose;