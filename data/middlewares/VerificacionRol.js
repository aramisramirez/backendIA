const Rol = require('../models/Roles/roles');

const checkDuplicateRol = async (req, res, next) => {

    const rol = await Rol.findOne({ nombreRol: req.body.nombreRol });

    if (rol) return res.status(400).json({ message: '¡Este rol ya existe!' });

    next();
}

module.exports = { checkDuplicateRol }