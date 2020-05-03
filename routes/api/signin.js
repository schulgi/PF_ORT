const User = require('../../models/user');
const express = require('express');
var bodyParser = require('body-parser');
const app = express.Router();

app.post('/api/account/signup',bodyParser.urlencoded({ extended: false }),(req,res,next) => {
    
    const{ body } = req;
    
    const { 
      firstName,
      lastName,
      password
    } = body;
    
    let{
        email
    } = body;

   //No es res.end() es res.send() ver dif. Explota con end();
    if(!firstName){
        return res.send({
            success:false,
            message: 'Error: El campo nombre no puede estar vacío'
     });
    }
    if(!lastName){
        return res.send({
            success:false,
            message: 'Error: El campo apellido no puede estar vacío'
     });
    }
    if(!email){
        return res.send({
            success:false,
            message: 'Error: El campo email no puede estar vacío'
     });
    }
    if(!password){
        return res.send({
            success:false,
            message: 'Error: El campo contraseña no puede estar vacío'
     });
    }

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, previousUsers) => {
        if(err){
            return res.send({
                success:false,
                message: 'Error: Server error'
         });
        } else if (previousUsers.length > 0){
            return res.send({
                success:false,
                message: 'Error: La cuenta ya existe.'
         });
        }

        //Guardo el User. Creo el Objeto User
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err,user) => {
            if(err){
                return res.send({
                    success:false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed Up'
            });
      });
    });
});

module.exports = app;