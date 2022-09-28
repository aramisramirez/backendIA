const { Router } = require('express');
const authCtrl = require('../../controllers/auth/auth.controller');
const verifyUser = require('../../middlewares/VerificacionUser');

const router = Router();

//nuevo usuario
router.post('/signup', [verifyUser.checkDuplicateUsername, verifyUser.checkDuplicateEmail], authCtrl.signUp);
//login
router.post('/signin', authCtrl.signIn);


module.exports = router;
