const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TarjetaSchema = new Schema({
    nombreTarjeta: {
        type: String,
        unique: true,
        required: true
    },

    Numero: {
        type: String,
        required: true
    },

    Vencimiento: {
        type: String,
        required: true
    },

    CodigoSeg: {
        type: String,
        required: true
    },

    MontoTarjeta: {
        type: Number,
        required: true
    },
    userCreacion: String,
    userModificacion: String,
    userAnulacion: String,



}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('Tarjetas', TarjetaSchema);
