const Ventas = require('../models/ventas/ventas');

const checkDuplicateBooks = async (req, res, next) => {

    const iddoc = req.body.idDocumento;
    const docu = req.body.documento;

    const id = await Ventas.findOne({ idDocumento: iddoc });
    const doc = await Ventas.findOne({ documento: docu });

    if ( id, doc) return res.status(400).json({ message: '¡ya habias comprado este libro!' });

    next();
}

module.exports = { checkDuplicateBooks }