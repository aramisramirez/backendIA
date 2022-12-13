const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VentasSchema = new Schema({
    idDocumento: {
        type: String,
        required: true
    },
    portada: {
        type: String,
        required: true
    },
    nombreDocumento: {
        type: String,
        required: true
    },
    descuento: {
        type: Number,
        required: true
    },
    documento: {
        type: String,
        required: true
    },

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
