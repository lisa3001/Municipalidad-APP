const mongoose = require('mongoose')

const reporteSchema = new mongoose.Schema({
    identificador: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    fecha: {
        type: String, //Lo puse como string y no date porque el date le agrega un montón de cosas extra, como la hora, el día de la semana y así
        required: true //entonces hay que definir un formato fijo para como se van a guardar las fechas porque luego en los filtros no van a coincidir
    },
    hora: {
        type: String,
        required: true
    },
    multimedia: {
        type: [String],
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    ubicacion: {
        type: [String],
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    creadoPor: {
        type: String, //ID del ciudadano que lo revisó
        required: true
    },
    revisadoPor: {
        type: String, //ID del personal de la municipalidad que lo revisó
        required: false
    }
},  { collection : 'Reporte' })

module.exports = mongoose.model('Reporte', reporteSchema)