const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PromocionesSchema = new Schema({
    Imagen: {
        type: String,
        required: true
    },

    Contenido: {
        type: String
    },
    isActive: Boolean,
    userCreacion: String,
    userModificacion: String,
    userAnulacion: String,
    fechaAnulacion: Date,



}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('Promociones', PromocionesSchema);
