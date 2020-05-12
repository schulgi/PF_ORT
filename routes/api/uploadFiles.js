const express = require('express');
const app = express.Router();
const verifyToken = require('../api/verifyToken');
const conn = require('../../config/keys');

app.post('/api/uploadfiles',async (req, res) => {
        
    const { body } = req;

    const { file } = body;

    /*const user = await User.findById(req.usuarioId,{ password: 0 });
    if(!user){
        return res.status(401).send('Usuario No Encontrado')
    }*/  //VERIFICA EL TOKEN
  
    let gfs;

    conn.once("open", () => {
        gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads" //Nombre de la Collection
  });

  const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads" // Nombre de la Collection
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({
    storage
  });

    });

    res.json('Finish');

});

module.exports = app;