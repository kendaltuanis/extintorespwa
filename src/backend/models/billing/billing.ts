const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DefaultInvoce = "Contado";


const inChargeSchema = new Schema({
    name: { type: String, require: true },
    flastname: { type: String, require: true },
    slastname: { type: String, require: true },
    position: { type: String } // cargo de la persona: Asistente, gerente, salud ocupacional...etc
}, { _id: false });

const phoneSchema = new Schema({
    countrycode: { type: Number, required: true },
    phone: { type: Number, required: true },
    extension: Number
}, { _id: false });

const serviceSchema = new Schema({
    quantity: { type: Number, require: true },
    typeservice: { type: String, require: true }, // Esto cuando es: Recarga, Venta, Matenimiento... 
    service: { type: String, require: true }, // (AQUI FALTA IMPLEMENTAR UN MODELO PARA LOS TIPOS DE SERVICIOS Y SU PRECIO)
    unitprice: { type: Number, require: true },
    typeprice: { type: String, require: true }
}, { _id: false });

//serviceSchema.index({ service: 1, typeservice: 1 }, { unique: true }); Lo hacemos mejor desde el frontend


const discountSchema = new Schema({
    discount: { type: Number, require: true },
    percentage: { type: Number, require: true },
}, { _id: false });

const invoicePaymentShema = new Schema({
    type: { type: String, require: true }, // Efectivo, transferencia, paypal...etc
    amount: { type: Number, require: true },
    voucher: { type: Number }, // Esto es en caso de transferencia o pago de Paypal
    date: { type: Date, default: Date.now() } // Esto en caso, porque puede que se hagan abonos de un crédito, entonces necesita la fecha de dicho abono
}, { _id: false });

/*
const notificationSchema = new Schema({
    type: { type: String, require: true }, // Esto en caso de que acepte una notificación para el otro año. Ya sea por correo, mensaje de text, Whathsapp, llamada...
    media: { type: String, require: true }, // Aqui se puede escribir el número de teléfono, correo... El medio de comunicación en el que quiere recibir
    daysbefore: { type: Number, require: true },
}, { _id: false });
*/

const addressSchema = new Schema({
    latitude: { type: String, require: true },
    longitude: { type: String, require: true },
    cp: String,
    suburb: String,
    details: String,
}, { _id: false });

const invoiceSchema = new Schema({ /*               */
    userInCharge: [inChargeSchema],
    address: [addressSchema],
    phones: [phoneSchema],
    services: [serviceSchema],
    discount: [discountSchema],
    invoicepayment: [invoicePaymentShema],
    invoiceDate: { type: Date, default: Date.now() }, // Esto es para saber la fecha que tiene la factura, ya que por alguna razón puede tener una fecha diferente al día que se está
    date: { type: Date, default: Date.now() }, // Esto es para saber el día que se hizo la factura
    type: { type: String, require: true, default: DefaultInvoce }, // Contado o Créidot
    total: { type: Number, require: true },
    invoicenumber: { type: Number, /*default: 0,*/ index: { unique: true } },
    credittime: { type: Number }, // Esto en caso de ser crédito
    isfinished: { type: Boolean, default: false }, // Esto se usaría más en caso de para saber si están pagos o no por se créditos
}, { _id: false });


const clientSchema = new Schema({
    taxname: { type: String, require: true },
    identification: { type: String }, // Cédula jurídica o Cédula física
    company: { type: String },
    invoices: [invoiceSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

clientSchema.pre('save', function (next) {
    var doc = this;
    invoiceSchema.findByIdAndUpdateAsync({ _id: 'entityId' }, { $inc: { invoicenumber: 1 } }, { new: true, upsert: true }).then(function (count) {
        console.log("...count: " + JSON.stringify(count));
        doc.sort = count.seq;
        next();
    })
        .catch(function (error) {
            console.error("counter error-> : " + error);
            throw error;
        });
});



export const Billing = mongoose.model("Billing", clientSchema);

