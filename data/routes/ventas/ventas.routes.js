const { Router } = require('express');
const ventasCtrl = require('../../controllers/ventas/ventas.controller');
const verifyVenta = require('../../middlewares/VerificacionVentas');
const verifyAuth = require('../../middlewares/Auth');

const router = Router();

// router.get('/searchDocumento/:username', documentoCtrl.buscarXDocumento);
router.get('/MostrarTodo/:usuario', verifyAuth.ensureAuth, ventasCtrl.getVentas);
router.get('/MostrarTodoCarrito/:usuario', verifyAuth.ensureAuth, ventasCtrl.getVentasCarrito);
router.put('/venta/:id', verifyAuth.ensureAuth, ventasCtrl.updateAddVentas);
router.post('/addCarrito', [verifyAuth.ensureAuth], ventasCtrl.addVentas);


module.exports = router;