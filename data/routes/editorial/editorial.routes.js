const { Router } = require('express');
const editorialCtrl = require('../../controllers/editorial/editorial.controller');
const verifarEditorial = require('../../middlewares/VirificationEditorial');
const verifyAuth = require('../../middlewares/Auth');

const router = Router();

// router.get('/searchDocumento/:username', documentoCtrl.buscarXDocumento);
router.get('/searchEditorial', verifyAuth.ensureAuth, editorialCtrl.getEditorial);
router.post('/addEditorial', verifyAuth.ensureAuth, [ verifarEditorial.checkEditorial], editorialCtrl.addEditoriales);


module.exports = router;