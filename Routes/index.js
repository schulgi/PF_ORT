const express = require('express');
const router = express.Router();

router.get('/', (req,res) => res.send('Welcome'));

/*Podria ir separado, en un archivo users.js , pero quiero que 
quede en la raiz para que el url quede twitter.com/login ç
twitter lo tiene asi.*/

//Login Page
router.get('/login', (req,res) => res.send('Login'));

//Register Page
router.get('/register', (req,res) => res.send('Register'));

module.exports = router;



