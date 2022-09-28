const editorialTodos = require('../../models/Editorial/editorial');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');

const getEditorial = async (req, res) => {

    try {
        let editorial = await editorialTodos.find({ isActive: true });
        if (!editorial.length) {
            message = 'No existen registros';
        }
        return res.status(200).json({ editorial });
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const addEditoriales = async (req, res) => {
    // capture data 
        // capture data 
        const { nombreEditorial, webSite, direccion, logo, userCreacion, isActive, userAnulacion, fechaAnulacion } = req.body;
        const Autor = req.body.Autor;
        const Editorial = req.body.Editorial
        // const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombreEditorial),
            !validator.isEmpty(webSite),
            !validator.isEmpty(direccion),
            !validator.isEmpty(logo)
        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newEditorialTodos = new editorialTodos({
                nombreEditorial,
                webSite,
                direccion,
                logo,
                isActive: true,
                userCreacion: "prueba",
                userAnulacion: null,
                fechaAnulacion: null,
            });
            const savedEditorial = await newEditorialTodos.save();
            // Response success
            const token = jwt.sign({ id: savedEditorial._id, nombre: savedEditorial.nombreEditorial, logo: savedEditorial.logo }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json({ message: '¡La editorial fue agregada exitosamente!', token });

        } else {
            // Return error
            res.status(400).json({ message: '¡Datos incompletos!' });
        }

}

module.exports = { getEditorial, addEditoriales }