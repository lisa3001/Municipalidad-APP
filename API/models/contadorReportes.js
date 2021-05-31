const mongoose = require('mongoose')

const contadorReportesSchema = new mongoose.Schema({
    cantidadActual: {
        type: Number,
        required: true
    }
},  { collection : 'ContadorReportes' })

module.exports = mongoose.model('ContadorReportes', contadorReportesSchema)