const User = require('../../models/User');
const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');
const verifyToken = require('../api/verifyToken');

//Registrar Cliente JWT
app.post('/api/signup', async (req,res,next) => {
    
    /*Recibo parametros del body html*/ 
    const { body } = req;
    const {firstName,lastName,password} = body;

    /*no es const ya que lo modifico con toLowerCase*/
    let { email } = body;

    /*siempre hacerle lower*/
    email = email.toLowerCase();

    /*Validar entradas*/
    if(!firstName){
        return res.send({
            success:false,
            message: 'Nombre Sin Datos/Error'
     });
    }
    if(!lastName){
        return res.send({
            success:false,
            message: 'Apellido Sin Datos/Error'
     });
    }
    if(!email){
        return res.send({
            success:false,
            message: 'Email Sin Datos/Error'
     });
    }
    if(!password){
        return res.send({
            success:false,
            message: 'Password Sin Datos/Error'
     });
    }

    /*Busco que el user no este repetido*/    
    await User.find({email: email}, (err, searchrepeat) => {
        if(err){
                res.send({
                success:false,
                message: 'Error Finding User'
         });
        } else if (searchrepeat.length > 0){
                res.send({
                success:false,
                message: 'Cuenta Existente'
         });
        } 
    });


    /*Creo un usuario de entrada*/

    const user = new User({   
        firstName,
        lastName,
        password,
        email
    });
    user.password = user.generateHash(password);
    user.save((err) => {
        if(err){
                res.send({
                success:false,
                message: 'Error Saving'
            });
        }
    });

    const token = jwt.sign({id : user._id},secret.secret, {
        expiresIn: 60 * 60 * 24 /*Un dia, expresado en segundos*/
    });

    res.json({auth: true, token});

});

//Verificar JWT Front-End, se envia token
app.get('/api/verify', verifyToken, async (req,res,next) => {

    /*Verifico que exista el token , que no esté caducado*/
    /*Le pasamos el token del User y el SECRET de la app*/

    const user = await User.findById(req.usuarioId,{ password: 0 });
    if(!user){
        return res.status(401).send('Usuario No Encontrado')
    }

    res.json(user);

});

//Logiar Cliente JWT
app.post('/api/signin', async (req,res,next) => {
    
    /*Consumo Body HTML*/ 
    const{ body } = req;
        
    const { password } = body;
    
    /*No es una const*/
    let{ email } = body;

    /*Validaciones*/
    if(!email){
        return res.send({
            success:false,
            message: 'Email Vacio'
     });
    }
    if(!password){
        return res.send({
            success:false,
            message: 'Password Vacio'
     });
    }

    /*LowerCase Mail*/
    email = email.toLowerCase();

    /*Si existe error de Headers quitar returns*/

    await User.find({email: email},(err,user) =>{
        if(err){
            return res.send({
                success:false,
                message: 'Error Servidor'
            });
        }
        if(user.length != 1){
            return res.send({
                success:false,
                message: 'Datos Erroneos Mail Inexistente'
            });
        }
        
        const user_ = user[0];
        if(!user_.validPassword(password)){
            return res.send({
                auth:false,
                token: null,
                message: 'Contraseña/Mail Incorrectos'
            });
        }

        const token = jwt.sign({id: user._id}, secret.secret,{
            expiresIn: 60 * 60* 24
        });
        
        res.json({auth:true,token});

    });
});

//Deslogiar , Romper Cookie
app.post('/api/logout',(req,res,next) => {

});

//Test Push Populate
app.post('/api/mongodb',(req,res,next) => {
   
    const{ body } = req;
    
      const { 
      name,
      age
    } = body;

    
    const { 
        creator,
        title
      } = body;
   

        //Guardo el User. Creo el Objeto Users
        const newStory = new Story();
        newStory._creator = creator;
        newStory.title = title;
        newStory.save()
        .then((result) => {
          Person.findOne({ name: 'gabriel' }, (err, user) => {
              if (user) {
                  user.stories.push(newStory.title);
                  user.save();
                  res.json({ message: 'Object Created' });
              }
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });

});

module.exports = app;


