var mongoose = require('../../config/conections/sgsdb/conection.js');

var Departamento = mongoose.model('departamento', {
    "id_ubigeo": Number,
    "nombre_ubigeo": String,
    "codigo_ubigeo": String,
    "etiqueta_ubigeo": String,
    "buscador_ubigeo": String,
    "numero_hijos_ubigeo": Number,
    "nivel_ubigeo": Number,
    "id_padre_ubigeo": Number
});

module.exports = Departamento;