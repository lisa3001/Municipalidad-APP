const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    primerApellido: {
        type: String,
        required: true
    },
    segundoApellido: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: String,
        required: true
    },
    paisNacimiento: {
        type: String,
        required: true
    },
    tipoIdentificacion: {
        type: String,
        required: true
    },
    numeroIdentificacion: {
        type: String,
        required: true
    },
    direccion: {
        type: [String],
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    telefonoSecundario: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    tipoCasos: {
        type: String,
        required: false
    }
},  { collection : 'Usuario' })

module.exports = mongoose.model('Usuario', usuarioSchema)