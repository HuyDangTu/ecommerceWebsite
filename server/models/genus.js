const mongoose = require('mongoose');

const genusSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxLength: 100, 
    }
});

const Genus = mongoose.model("Genus", genusSchema);

module.exports = { Genus };