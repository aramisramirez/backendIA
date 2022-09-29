const validator = require('validator');
const config = require('../../database/config');
const jwt = require('jsonwebtoken');
const Rol = require('../../models/tarjetas/tarjetas');
const tarjetas = require('../../models/tarjetas/tarjetas');

const getTargeta = async (req, res) => {

    try {
        let tarjetaPrueba = await tarjetas.find({ userAnulacion: null });
        if (!tarjetaPrueba.length) {
            message = 'No existen registros';
        }
        return res.status(200).json({ tarjetaPrueba });
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}


const addTarjeta = async (req, res) => {
    // capture data 
        const { nombreTarjeta, Numero, Vencimiento, CodigoSeg, MontoTarjeta } = req.body;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombreTarjeta),
            !validator.isEmpty(Numero),
            !validator.isEmpty(Vencimiento),
            !validator.isEmpty(CodigoSeg),
            !validator.isEmpty(MontoTarjeta)
        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newTarjeta = new Rol({
                nombreTarjeta,
                Numero,
                Vencimiento,
                CodigoSeg,
                MontoTarjeta,
                userCreacion: usernameLogin,
                userModificacion: null,
                userAnulacion: null
            });

            const savedtarjeta = await newTarjeta.save();
            // // Response success
            const token = jwt.sign({ id: savedtarjeta._id, nombreTarjeta: savedtarjeta.nombreTarjeta }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json(token);
        } else {
            // Return error
            res.status(400).json({ message: '¡Datos incorrectos!' });
        }
}


module.exports = { getTargeta, addTarjeta }