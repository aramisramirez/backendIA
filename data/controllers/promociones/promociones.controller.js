const validator = require('validator');
const config = require('../../database/config');
const jwt = require('jsonwebtoken');
const Rol = require('../../models/Promociones/promociones');


const addPromociones = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        const { Imagen, Contenido } = req.body;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(Imagen),
            !validator.isEmpty(Contenido),

        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newPromocion = new Rol({
                Imagen,
                Contenido,
                isActive: true,
                userCreacion: usernameLogin
            });

            const savedPromociones = await newPromocion.save();
            // // Response success
            const token = jwt.sign({ Imagen: savedPromociones.Imagen, Contenido: savedPromociones.Contenido }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json(token);
        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar roles!' });
    }
}


const getPromociones = async (req, res) => {
    // capture data 

        try {
            let promocion = await Rol.find({isActive: true});
            if (!promocion.length) {
                return res.status(400).json(message = 'No existen registros')
            }
            return res.status(200).json({
                promocion
            });
        }
        catch (e) {
            return res.status(500).json({
                message: '¡Ocurrió un error!'
            });
        }
}




module.exports = { addPromociones, getPromociones }