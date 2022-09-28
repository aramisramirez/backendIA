const { Router } = require('express');
const PromocionCtrl = require('../../controllers/promociones/promociones.controller');
const verifyAuth = require('../../middlewares/Auth');

const router = Router();

router.get('/', verifyAuth.ensureAuth, PromocionCtrl.getPromociones);
router.post('/add', [verifyAuth.ensureAuth], PromocionCtrl.addPromociones);


module.exports = router;
