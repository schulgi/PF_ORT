const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema();
const possibleRoles = ['A', 'C'];

const UserSchema = new mongoose.Schema({
    
    tipo:{
        type: [{type: String, enum: possibleRoles}],
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    dni:{
        type: String,
       require: false
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    localidad:{
        type: String,
       require: false
    },
    codpos:{
        type: String,
       require: false
    },
    direccion:{
        type: String,
       require: false
    },
    tel:{
        type: String,
       require: false
    },
    tel2:{
        type: String,
       require: false
    },
    nacionalidad:{
        type: String,
       require: false
    },
    imgDNI:{
        type: String,
       require: false
    },
    avatar:{
        type: String,
       require: false  
    },
    documents:{
        type: String,
        require: false
    },
    consultas:{
        type: String,
       require: false
    },
    arancel:{
        type: String,
       require: false
    },
    matricula:{
        type: String,
       require: false
    },
    especialidad:{
        type: String,
       require: false
    },
    cv:{
        type: String,
       require: false
    },
    dateCreate:{
        type: String,
        default: Date.now()
    },  
    isDeleted:{ 
        type: String,
        require: false
    },
    validadoMail:{
        type: String,
       require: false
    },
    estado:{
        type: String,
       require: false
    }
    
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

/*UserSchema.virtual('possibleRoles').get(function () {
    return possibleRoles;
});*/


module.exports = mongoose.model('user',UserSchema);

