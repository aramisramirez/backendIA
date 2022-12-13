const ventasTodos = require('../../models/ventas/ventas');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');
const ventas = require('../../models/ventas/ventas');


const getVentas = async (req, res) => {

    try {
        const paramCUsuario = req.params.usuario;
        const usuarioVenta = await ventasTodos.find({ usuario: paramCUsuario, estado: true });
        
        if ( usuarioVenta.length > 0) {
            return res.status(200).json({ usuarioVenta });
        }else {
            // Return error
            res.status(401).json({ message: '¡Carrito vacio!' });
        }

        
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const getVentasCarrito = async (req, res) => {

    try {
        const paramCUsuario = req.params.usuario;
        const usuarioVenta = await ventasTodos.find({ usuario: paramCUsuario, estado: false });
        
        if ( usuarioVenta.length > 0) {
            return res.status(200).json({ usuarioVenta });
        }else {
            // Return error
            res.status(401).json({ message: '¡Carrito vacio!' });
        }

        
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const addVentas = async (req, res) => {
    // capture data 
        // capture data 
        const {idDocumento, nombreDocumento,portada, descuento, documento, usuario, iva, precioTotal, estado, userCreacion, isActive, userAnulacion, fechaAnulacion } = req.body;
        
        const validate = [
            !validator.isEmpty(idDocumento),
            !validator.isEmpty(nombreDocumento),
            !validator.isEmpty(portada),
            !validator.isEmpty(descuento),
            !validator.isEmpty(documento),
            !validator.isEmpty(usuario),
            !validator.isEmpty(iva),
            !validator.isEmpty(precioTotal)
        ];
        // validate array data and if there is incorrect data return
        const { usernameLogin } = req.user;
        const { rol } = req.user;
        if (rol === "User") {
            if (validate.every(v => v === true) ) {
                // Create the object
                const newVentasTodos = new ventasTodos({
                    idDocumento,
                    nombreDocumento,
                    portada,
                    descuento,
                    documento,
                    usuario,
                    iva,
                    precioTotal,
                    estado: false,
                    isActive: true,
                    userCreacion: usernameLogin,
                    userCompra: null,
                    userAnulacion: null,
                    fechaAnulacion: null,
                });

                const savedCarrito = await newVentasTodos.save();

                res.status(201).json({Carrito: savedCarrito.usuario, message: '¡Agregaste tu producto al carrito!' });

            } else {
                // Return error
                res.status(400).json({ message: '¡Favor revisar la disponibilidad!' });
            }
        } else {
            // Return error
            res.status(400).json({ message: '¡Este usuario no posee permisos para editar estado de usuarios!' });
        }  
}

const updateAddVentas = async (req, res) => {

    const userr = req.params.usuario;
    const params = req.body;
    // capture data 
    const { username } = req.user;
    const { rol } = req.user;
    if (rol === "User") {
        ventas.findOneAndUpdate({ userCreacion: userr, estado: false }, { estado: true , userCompra: username  }, { new: true }, (err, ventaUp) => {
            if (err) return res.status(404).json({ message: '¡Ocurrió un error!', ventaUp });
            if (!ventaUp) return res.status(404).json({ message: '¡No tienes nada agregado al carrito para comprar!' });

            return res.status(200).json({ message: '¡Estado actualizado!', users });
        });
    } else {
        // Return error
        res.status(400).json({ message: '¡Este usuario no posee permisos para editar estado de usuarios!' });
    }    
}

// const updateStatus = async (req, res) => {
//     const id = req.params.id;
//     const { usernameLogin } = req.user;
//     // capture data 
//     const { rol } = req.user;
//     if (rol === "admin") {
//         Sede.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false, userAnulacion: usernameLogin, fechaAnulacion: new Date() }, { new: true }, (err, sedeUp) => {
//             if (err) return res.status(404).json({ message: '¡Ocurrió un error!' });
//             if (!sedeUp) return res.status(404).json({ message: '¡La sede no existe!' });
//             const token = jwt.sign({ nombreSede: sedeUp.nombreSede }, config.secret, {
//                 expiresIn: 86400 // 24 Hours
//             });
//             return res.status(200).json({ message: '¡Estado actualizado!', token });
//         });
//     } else {
//         // Return error
//         res.status(200).json({ message: '¡Este usuario no posee permisos para editar estado de sedes!' });
//     }

// }



module.exports = { addVentas, getVentas, updateAddVentas, getVentasCarrito }