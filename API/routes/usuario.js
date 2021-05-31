const express = require ('express')
const router = express.Router()
const Usuario = require('../models/usuario')

//Obtener todos
router.get('/', async (req, res) => {
    try{
        const usuario = await Usuario.find()
        res.json(usuario)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Obtiene el usuario por el correo, devuelve los datos del usuario, esto para validar el logIn
router.get('/credenciales/:correo', async (req, res) => {
    try{
        const usuario = await Usuario.find({ correo: req.params.correo})
        res.json(usuario)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Obtener Uno
router.get('/:id', getUsuario, (req, res) => {
    res.json(res.usuario)
})

//Crear
router.post('/', async(req, res) => {
    const usuario = new Usuario ({
        nombre: req.body.nombre,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        sexo: req.body.sexo,
        fechaNacimiento: req.body.fechaNacimiento,
        paisNacimiento: req.body.paisNacimiento,
        tipoIdentificacion: req.body.tipoIdentificacion,
        numeroIdentificacion: req.body.numeroIdentificacion,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        telefonoSecundario: req.body.telefonoSecundario,
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
        tipoCasos: req.body.tipoCasos
    })
    try{
        const newOne = await usuario.save()
        res.status(201).json(newOne)
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})

//Eliminar
router.delete('/:id', getUsuario , async(req, res) => {
    try{
        await res.usuario.remove()
        res.json({message:"eliminado"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Actualizar
router.patch('/:id', getUsuario, async (req, res) => {
    res.usuario.nombre = req.body.nombre,
    res.usuario.primerApellido = req.body.primerApellido,
    res.usuario.segundoApellido = req.body.segundoApellido,
    res.usuario.sexo = req.body.sexo,
    res.usuario.fechaNacimiento = req.body.fechaNacimiento,
    res.usuario.paisNacimiento = req.body.paisNacimiento,
    res.usuario.tipoIdentificacion = req.body.tipoIdentificacion,
    res.usuario.numeroIdentificacion = req.body.numeroIdentificacion,
    res.usuario.direccion = req.body.direccion,
    res.usuario.telefono = req.body.telefono,
    res.usuario.telefonoSecundario = req.body.telefonoSecundario,
    res.usuario.correo = req.body.correo,
    res.usuario.contrasenia = req.body.contrasenia,
    res.usuario.tipoCasos = req.body.tipoCasos
    try{
        const updateUsuario = await res.usuario.save()
        res.json(updateUsuario)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

async function getUsuario(req, res, next){
    let usuario
    try{
        usuario = await Usuario.findById(req.params.id)
        if(usuario == null){
            return res.status(404).json({message: 'No se encontró el personal'})
        }
    } catch(err){
        return res.status(500).json({message: err.message })
    }
    res.usuario = usuario
    next()
}

module.exports = router