const { Router } = require('express');
const rolCtrl = require('../../controllers/rol/rol.controller');
const verifyRol = require('../../middlewares/VerificacionRol');
const verifyAuth = require('../../middlewares/Auth');

const router = Router();

router.get('/', verifyAuth.ensureAuth, rolCtrl.getRoles);
router.post('/add', [verifyAuth.ensureAuth, verifyRol.checkDuplicateRol], rolCtrl.add);


module.exports = router;
