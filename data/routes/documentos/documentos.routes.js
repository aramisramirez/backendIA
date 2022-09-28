const { Router } = require('express');
const documentoCtrl = require('../../controllers/documento/documentos.controller');
const verifarDocumento = require('../../middlewares/VerificacionDocumentos');
const verifyAuth = require('../../middlewares/Auth');

const router = Router();

// router.get('/searchDocumento/:username', documentoCtrl.buscarXDocumento);
router.get('/searchDocumento',  documentoCtrl.getDocumentos);
router.get('/searchDocumentoRec',  documentoCtrl.getDocumentosRecomendados);
router.get('/searchDocumentoCat/:categoria',  documentoCtrl.getDocumentosCategoria);
router.get('/searchDocumentoTodo',  documentoCtrl.getDocumentosTodos);
router.post('/add', verifyAuth.ensureAuth, [ verifarDocumento.checkDocumentos], documentoCtrl.addDocuemntos);


module.exports = router;
