const DocuementosTodos = require('../../models/Documentos/documentos');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');



const getDocumentos = async (req, res) => {

    try {
        let documentos = await DocuementosTodos.find({ isActive: true, Estado: 'descuento' });
        if (!documentos.length) {
            message = 'No existen registros';
        }
        return res.status(200).json({ documentos });
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const getDocumentosRecomendados = async (req, res) => {

    try {
        let documentos = await DocuementosTodos.find({ isActive: true, Estado: 'recomendaciones' });
        if (!documentos.length) {
            message = 'No existen registros';
        }
        return res.status(200).json({ documentos });
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const getDocumentosCategoria = async (req, res) => {

    try {
        let categoriaDoc = req.params.categoria;
        let documentos = await DocuementosTodos.find({ isActive: true, categoria: categoriaDoc });
        if (!documentos) {
            message = 'No existen registros con esa categoria';
        }
        return res.status(200).json({ documentos });
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const getDocumentosTodos = async (req, res) => {

    try {
        let documentos = await DocuementosTodos.find({ isActive: true });
        if (!documentos) {
            message = 'No existen registros';
        }
        return res.status(200).json({ documentos });
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const addDocuemntos = async (req, res) => {
    // capture data 
        // capture data 
        const { Documento, TipoDocumento, Denominacion, Existencias, Estado, Pais, Idioma, imagen, categoria, descripcion, file, Precio, ISBN, ISSN, DOI, FechaPublicacion, userCreacion, isActive, userAnulacion, fechaAnulacion } = req.body;
        const Autor = req.body.Autor;
        const Editorial = req.body.Editorial
        // const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(Documento),
            !validator.isEmpty(TipoDocumento),
            !validator.isEmpty(Denominacion),
            !validator.isEmpty(Existencias),
            !validator.isEmpty(Estado),
            !validator.isEmpty(Pais),
            !validator.isEmpty(Idioma),
            !validator.isEmpty(categoria),
            !validator.isEmpty(Precio),
            !validator.isEmpty(descripcion),
            !validator.isEmpty(file)
        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true) && (Autor.length > 0) && (Editorial.length > 0)) {
            // Create the object
            const newDocumentosTodos = new DocuementosTodos({
                Documento,
                TipoDocumento,
                Denominacion,
                Existencias,
                Estado,
                Pais,
                Idioma,
                imagen,
                file,
                descripcion,
                categoria,
                Precio,
                Autor,
                Editorial,
                ISBN,
                ISSN,
                DOI,
                FechaPublicacion,
                isActive: true,
                userCreacion: "prueba",
                userAnulacion: null,
                fechaAnulacion: null,
            });
            const savedDocumentos = await newDocumentosTodos.save();
            // Response success
            const token = jwt.sign({ id: savedDocumentos._id, nombre: savedDocumentos.Documento, tipo: savedDocumentos.TipoDocumento }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json({ message: '¡El Documento fue agregado exitosamente!', token });

        } else {
            // Return error
            res.status(400).json({ message: '¡Datos incompletos!' });
        }

}

module.exports = { addDocuemntos, getDocumentos, getDocumentosRecomendados, getDocumentosCategoria, getDocumentosTodos }
