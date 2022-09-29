const { Router } = require('express');
const tarjetaCtrl = require('../../controllers/tarjetas/tarjetas.controller');
// const verifyRol = require('../../middlewares/VerificacionRol');
const verifyAuth = require('../../middlewares/Auth');

const router = Router();

router.get('/obtenerTarjeta', verifyAuth.ensureAuth, tarjetaCtrl.getTargeta);
router.post('/addTarjeta', [verifyAuth.ensureAuth], tarjetaCtrl.addTarjeta);


module.exports = router;