const Editorialestodo = require('../models/Editorial/editorial');

const checkEditorial = async (req, res, next) => {

    const Nombre = await Editorialestodo.findOne({ nombreEditorial: req.body.nombreEditorial, isActive: true  });
    const Web = await Editorialestodo.findOne({ webSite: req.body.webSite, isActive: true  });
    const Logo = await Editorialestodo.findOne({ logo: req.body.logo, isActive: true  });

    if (Nombre || Web || Logo ) return res.status(400).json({ message: '¡Esta editorial ya existe!' });

    next();
}

module.exports = { checkEditorial }