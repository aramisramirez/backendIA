require('dotenv').config();
const Server = require('./data/models/server');

const server = new Server();

server.listen();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './data/uploads') //Se guarda la imagen en crudo
//     },
//     filename: (req, file, cd) => {
//         const ext = file.originalname.split('.').pop() // separa el formato del nombre del archivo --> PNG, pdf, jpg
//         cb(null, `${Date.now()}.${ext}`)
//     }
// })

// const upload = multer({ storage })
