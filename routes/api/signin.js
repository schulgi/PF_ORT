const User = require('../../models/user');
const UserSession = require('../../models/userSession');
const express = require('express');
const app = express.Router();

//Registrar
app.post('/api/account/signup',(req,res,next) => {
    
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

        //Guardo el User. Creo el Objeto Users
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

//Logiar
app.post('/api/account/signin',(req,res,next) => {
    
    const{ body } = req;
        
    const { 
      password
    } = body;
        
    let{
       email
    } = body;

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
    },(err,user) =>{
        if(err){
            return res.send({
                success:false,
                message: 'Error: Server Error'
            });
        }
        //console.log(user);
        if(user.length != 1){
            return res.send({
                success:false,
                message: 'Error: Datos Erroneos'
            });
        }
        
        const user_ = user[0];
        if(!user_.validPassword(password)){
            return res.send({
                success:false,
                message: 'Error: Invalid'
            });
        }

        const UserSession_ = new UserSession();
        UserSession_.userId = user._id;
        UserSession_.save((err,doc) => {
            if(err){
                return res.send({
                    success:false,
                    message: 'Error: Server error'
            });
          }
          return res.send({
            success:true,
            message: 'Entrada Valida',
            token: doc._id
           });
        });
    });
});

//Deslogiar -- No cambia el estado
app.post('/api/account/logout',(req,res,next) => {
    
    const { query } = req;
    
    const { token } = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {$set:{isDeleted:true}}, null, (err,sessions) => {
        console.log(_id);
        console.log(isDeleted);
        if(err) {
            return res.send({
                success: false,
                message: 'Error:Server error'
        });
      }
        return res.send({
            success: true,
            message: 'Session Cerrada'
        });
  });
});

//No puede verificar ya que Logout no esta funcionando
app.get('/api/account/verify',(req,res,next) => {
    
    const { query } = req;
    
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err,sessions) => {
        if(err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
        });
      }

      if(sessions.length != 1){
        return res.send({
            success: false,
            message: 'Error: Server error'
        });
    }else{
        return res.send({
            success: true,
            message: 'Valid'
        });
    }
    
  });
});

//Completa datos abogado
app.post('/api/account/modify', (req,res,next) => {
    
    const{ body } = req;
    
    let { 
        email
    } = body;

    email = email.toLowerCase();

    User.findOneAndUpdate({
        email: email,
    }, {$set:{firstName:'dsadsa'}}, null, (err,sessions) => {
        //console.log(matricula);
        if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
        });
      }
        return res.send({
            success: true,
            message: 'Cambios aceptados'
        });
  });

});


module.exports = app;

/*Crear Ruta para verificar o hacerlo dentro de SIGNIN la 
idea del verificar es que si se quieren loggiar de otra pc
no les permita que tiene un token activo, o dejar loggiar pero
permitir el aviso de que hay mas de 1 session loggiada*/

/*Hay que hacer una ruta que maneje tokens porque esta
reemplazando el token en cada session totalmente vulnerable*/

/*Token vs Cookie*/

/*Para que la session no pueda ser iniciada varias veces en menos
de un determinado tiempo, crear verificador y crear parametro
next possible login, attempts limiter*/ 

