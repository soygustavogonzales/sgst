var mongoose = require('../../config/conections/sgsdb/conection.js');

var User = mongoose.model('user', {
    "dni": String,
    "name": String,
    "lastname": String,
    "borndate": String,
    "email": String,
    "password": String,
    "roles": {"type":Array, "default":[]},
    "direccion": String,
    "departamento": String,
    "provincia": String,
    "distrito": String
});

module.exports = User;