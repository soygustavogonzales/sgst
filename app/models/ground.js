var mongoose = require('../../config/conections/sgsdb/conection.js');

var Ground = mongoose.model('Ground', {
 regPub: String,
 direction: String,
 area:Number,
 precioBase:Number,
 coordinates: {latitude: Number, longitude:Number},
 notes: String,
 urlGMAPS: String,
 picture: {src:String},
 Departamento: String,
 Porvincia:String,
 Distrito:String,
 dateRegister: {type:Date, default:Date.now}
});

module.exports = Ground;