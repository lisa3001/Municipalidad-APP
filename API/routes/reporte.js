const express = require ('express')
const router = express.Router()
const Reporte = require('../models/reporte')
const reportesContador = require('../models/contadorReportes')


var contadorReportes = 0
var contadorBase = null


//Función para obtener la cantidad de reportes generados y asignarselos al contador que se utiliza para asignarle
//un identificador a cada reporte
async function asignarContadorReportes(){
    try{
        const contador = await reportesContador.find()
        contadorReportes = contador[0].cantidadActual
        contadorBase = contador[0]
    }
    catch{
    }
}

asignarContadorReportes()

//------------------------------------------------------------------------------------

//Obtener todos los reportes
router.get('/', async (req, res) => {
    try{
        const reporte = await Reporte.find()
        res.json(reporte)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//------------------------------------------------------------------------------------

//Obtener por tipo de reporte, es para la vista previa de los reportes, entonces solo se envía el identificador del reporte, el id y la fecha
router.get('/reportes-tipo/:tipo', async (req, res) => {
    try{
        const reporte = await Reporte.find({tipo: req.params.tipo})
        res.json( reporte.map(function(r) {return {id: r._id, identificador: r.identificador, fecha: r.fecha}}))
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//-------------------------------------------------------------------------------------

//Obtener por ciudadano, el id que se envía en la dirección es el id del usuario, es para la vista previa de los reportes, entonces solo se envía el id del reporte, el identificador y la fecha
router.get('/reportes-ciudadano/:id', async (req, res) => {
    try{
        const reporte = await Reporte.find({creadoPor: req.params.id})
        res.json(reporte.map(function(r) {return {id: r._id, identificador: r.identificador, fecha: r.fecha}}))
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//----------------------------------------------------------------------------------

//Obtener por personal, el id que se envía en la dirección es el id del usuario, es para la vista previa de los reportes(la parte de ver mis reportes), entonces solo se envía el identificador del reporte, el id y la fecha
router.get('/reportes-personal/:id', async (req, res) => {
    try{
        const reporte = await Reporte.find({revisadoPor: req.params.id})
        res.json(reporte.map(function(r) {return {id: r._id, identificador: r.identificador, fecha: r.fecha}}))
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//---------------------------------------------------------------------------------------

//Obtener un reporte en específico, el id que se envía es el del reporte
router.get('/:id', getReporte, (req, res) => {
    res.json(res.reporte)
})

//--------------------------------------------------------------------------------------

//Función post para aplicarle filtros a la busqueda de reportes, entonces recibe un json con los filtros que se
//quieren aplicar solo agregué filtrar por identificador, por fecha, por estado y por tipo, si no se va a aplicar
//alguno nada más no se incluye en el json, si quiere agregar otro filtro, nada más agrega un if como los que está ahí
router.post('/filtrar', async (req, res) => {
    try{
        let reportes = await Reporte.find()
        if(req.body.identificador != null) {
            reportes = reportes.filter( x => x.identificador == req.body.identificador)
        }
        if(req.body.fecha != null) {
            reportes = reportes.filter( x => x.fecha == req.body.fecha)
        }
        if(req.body.estado != null) {
            reportes = reportes.filter( x => x.estado == req.body.estado)
        }
        if(req.body.tipo != null) {
            reportes = reportes.filter( x => x.tipo == req.body.tipo)
        }
        res.json(reportes)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//---------------------------------------------------------------------------------

//Crear un nuevo reporte, los que dicen que no se envía es porque no se incluyen en el json , ya que son valores que se asignan
//estáticamente acá
router.post('/', async(req, res) => {
    const reporte = new Reporte ({
        identificador: "Reporte " + "#" + contadorReportes.toString(), //Este no se envía
        tipo: req.body.tipo,
        fecha: req.body.fecha,
        hora: req.body.hora,
        multimedia: req.body.multimedia,
        descripcion: req.body.descripcion,
        ubicacion: req.body.ubicacion,
        estado: "Esperando para ser revisado", //Este no se envía
        creadoPor: req.body.creadoPor,
        revisadoPor: "" //Este no se envía
    })
    try{
        const newOne = await reporte.save()
        res.status(201).json(newOne)
        contadorReportes++
        contadorBase.cantidadActual = contadorReportes
        ;(await contadorBase).save()

    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})

//--------------------------------------------------------------------------

//Eliminar un reporte, el id es el del reporte que se quiere eliminar
router.delete('/:id', getReporte , async(req, res) => {
    try{
        await res.reporte.remove()
        res.json({message:"eliminado"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//---------------------------------------------------------------------------

//Actualizar un reporte, nada más se puede actualizar el estado y quien lo revisa, si quieren agregar otro, nada más 
//agregan un if como los que ya están
router.patch('/:id', getReporte, async (req, res) => {
    if(req.body.estado != null) {
        res.reporte.estado = req.body.estado
    }
    if(req.body.revisadoPor != null) {
        res.reporte.revisadoPor = req.body.revisadoPor
    }
    try{
        const updateReporte = await res.reporte.save()
        res.json(updateReporte)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//-------------------------------------------------------------------------------------------------------------

async function getReporte(req, res, next){
    let reporte
    try{
        reporte = await Reporte.findById(req.params.id)
        if(reporte == null){
            return res.status(404).json({message: 'No se encontró el personal'})
        }
    } catch(err){
        return res.status(500).json({message: err.message })
    }
    res.reporte = reporte
    next()
}

module.exports = router