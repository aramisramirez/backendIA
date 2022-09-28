const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VentasSchema = new Schema({
    carrito: [
        {
            id: String,
            nombreDocumento: String,
            estado: Boolean,
            precio: Number,
            descuento: Number
        }
    ],

    usuario: {
        type: String,
        required: true
    },

    iva: {
        type: Number,
        required: true
    },

    precioTotal: {
        type: Number,
        required: true
    },
    estado: Boolean,
    userCreacion: String,
    userCompra: String,
    userModificacion: String,
    userAnulacion: String,
    fechaAnulacion: Date,



}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('ventas', VentasSchema);
