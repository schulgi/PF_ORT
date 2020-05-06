const mongoose = require('mongoose');

const abogadoSchema = new mongoose.Schema({
    
    matricula:{
        type: String,
        required: true
    },
    especialidad:{
        type: String,
        required: true
    },
    arancel:{
        type: String,
        required: true
    }

});

const abogado = mongoose.model('abogado',abogadoSchema);

module.exports = abogado;