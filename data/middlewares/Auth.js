//invocamos las dependencias necesarias
const jwtSimple = require('jwt-simple');
const moment = require('moment');
const config = require('../database/config');


const ensureAuth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "No existe una cabecera de autenticación" });
    }
    let token = req.headers.authorization.split(" ")[1];
    let payload;
    try {
        payload = await jwtSimple.decode(token, config.secret);
        if (payload.exp <= moment.unix()) {
            return res.status(401).send({ message: 'Tu conexión ha expirado, ¡Vuelve a iniciar sesión!' });
        }
    } catch (e) {
        return res.status(500).send({ message: "Ha ocurrido un error: " + e.message });
    }
    req.user = payload;
    next();
}

module.exports = { ensureAuth }
