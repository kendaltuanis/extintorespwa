const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var uniqueValidator = require('mongoose-unique-validator');


const phoneSchema = new Schema({
    countrycode: { type: Number, required: true },
    phone: { type: Number, required: true },
    extension: Number
}, { _id: false });

const personalSchema = new Schema({
    name: String,
    flastname: String,
    slastname: String,
    identification: String,
    company: String,
    taxname: String,
    phones: [phoneSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

//phoneSchema.index({countrycode: 1, phone: 1, extension:1}, {unique: true}); Esto lo valido en el Frond End

export const Phone = phoneSchema;
export const Personal = mongoose.model("PersonalData", personalSchema);


/* Plugins
phoneSchema.plugin(uniqueValidator, {
    message : 'Name must be unique.'
  })
  */