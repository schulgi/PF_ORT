const secret = require('../../config/secret');
const jwt = require('jsonwebtoken');

function verifyToken (req,res,next) {
    /*Busco token en los headers del front*/
    const token = req.headers['x-access-token'];
    if(!token){
        return  res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }
    const decoded = jwt.verify(token,secret.secret);
    req.usuarioId = decoded.id;
    next();
}

module.exports = verifyToken;