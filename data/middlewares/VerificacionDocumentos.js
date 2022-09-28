const DocumentosTodos = require('../models/Documentos/documentos');

const checkDocumentos = async (req, res, next) => {

    const Docs = await DocumentosTodos.findOne({ Documento: req.body.Documento, isActive: true  });
    const Isbn = await DocumentosTodos.findOne({ ISBN: req.body.ISBN, isActive: true  });
    const Issn = await DocumentosTodos.findOne({ ISSN: req.body.ISSN, isActive: true  });
    const Doi = await DocumentosTodos.findOne({ DOI: req.body.DOI, isActive: true  });

    if (Docs || Isbn || Issn || Doi) return res.status(400).json({ message: '¡Este documento ya existe!' });

    next();
}

module.exports = { checkDocumentos }