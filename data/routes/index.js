
const { Router } = require('express');
const fs = require('fs');

const router = Router();

const PATH_ROUTES = __dirname;

const removeExtention = (filename) => {
    return filename.split('.').shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtention(file);
    if (name !== 'index') {
        router.use(`/${name}`, require(`./${name}/${file}.routes`))
    }
});

module.exports = router;