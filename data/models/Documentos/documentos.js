const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DocumentoSchema = new Schema({
    Documento: {
        type: String,
        unique: true,
        required: true
    },
    TipoDocumento: {
        type: String,
        required: true
    },
    Denominacion: {
        type: String,
        required: true
    },
    Existencias: {
        type: Number,
        required: true
    },
    Estado: {
        type: String,
        required: true
    },
    Pais: {
        type: String,
        required: true
    },
    Idioma: {
        type: String,
        required: true
    },
    imagen: String,
    categoria: String,
    file: String,
    descripcion: String,
    Precio: Number,
    Autor: [
        {
            NombreAutor: String,
            Websites: String,
            Foto: String,
            Descripcion: String
        }
    ],
    Editorial: [
        {
            NombreEditorial: String,
            Website: String,
            Direccion: String,
            Logo: String,
            FechaCreacion: String
        }
    ],
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    ISSN: {
        type: String,
        unique: true,
        required: true
    },
    DOI: {
        type: String,
        unique: true,
        required: true
    },
    FechaPublicacion: {
        type: String,
        required: true
    },

    userCreacion: String,
    isActive: Boolean,
    userAnulacion: String,
    fechaAnulacion: Date
}, {
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('Documento', DocumentoSchema);