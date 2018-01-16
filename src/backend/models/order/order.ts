const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const serviceSchema = new Schema({
    quantity: { type: Number, require: true },
    typeservice: { type: String, require: true }, // Esto cuando es: Recarga, Venta, Matenimiento... 
    service: { type: String, require: true }, // (AQUI FALTA IMPLEMENTAR UN MODELO PARA LOS TIPOS DE SERVICIOS Y SU PRECIO)
    unitprice: { type: Number, require: true },
    typeprice: { type: String, require: true }
}, { _id: false });

const statusSchema = new Schema({
    quantity: { type: Number, require: true },
    typeservice: { type: String, require: true }, // Esto cuando es: Recarga, Venta, Matenimiento... 
    service: { type: String, require: true }, // (AQUI FALTA IMPLEMENTAR UN MODELO PARA LOS TIPOS DE SERVICIOS Y SU PRECIO)
    unitprice: { type: Number, require: true },
    typeprice: { type: String, require: true }
}, { _id: false });


const orderSchema = new Schema({
    status: [statusSchema],
    services: [serviceSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
    //numero de orden  y otras cosas que se necesitan 
});


export const Order = mongoose.model("Order", orderSchema);


/* Plugins
phoneSchema.plugin(uniqueValidator, {
    message : 'Name must be unique.'
  })
  */