const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var uniqueValidator = require('mongoose-unique-validator');

const phoneSchema = new Schema({
    countrycode: { type: Number, required: true },
    phone: { type: Number, required: true },
    extension: Number
}, { _id: false });

const addressSchema = new Schema({
    latitude: { type: String, require: true },
    longitude: { type: String, require: true },
    cp: String,
    suburb: String,
    details: String,
}, { _id: false });

const serviceSchema = new Schema({
    quantity: { type: Number, require: true },
    typeservice: { type: String, require: true }, // Esto cuando es: Recarga, Venta, Matenimiento... 
    service: { type: String, require: true }, // (AQUI FALTA IMPLEMENTAR UN MODELO PARA LOS TIPOS DE SERVICIOS Y SU PRECIO)
    unitprice: { type: Number, require: true }
}, { _id: false });

const personSchema = new Schema({ // 1: Receptor de Factura 
    name: String, // 1
    flastname: String, // 1
    slastname: String, // 1
    identification: String, // 1
    company: String,
    taxname: { type: String, default: '' },
    address:[addressSchema],
    phones: [phoneSchema],
    services:[serviceSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

export const List = mongoose.model("List", personSchema);
