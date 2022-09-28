const Ventas = require('../models/ventas/ventas');

const checkDuplicateBooks = async (req, res, next) => {

    const carritos = req.body.carrito;

    const venta = await Ventas.find({ 'carrito.nombreDocumento': carritos.nombreDocumento });

    if ( venta) return res.status(400).json({ message: '¡ya habias comprado este libro!' });

    next();
}

module.exports = { checkDuplicateBooks }