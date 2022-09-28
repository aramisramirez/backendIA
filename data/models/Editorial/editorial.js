const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EditorialSchema = new Schema({
    nombreEditorial: {
        type: String,
        unique: true,
        required: true
    },

    webSite: {
        type: String,
        required: true
    },

    direccion: {
        type: String,
        required: true
    },

    logo: {
        type: String,
        required: true
    },
    userCreacion: String,
    userModificacion: String,
    userAnulacion: String,
    fechaAnulacion: Date,



}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('Editorial', EditorialSchema);
