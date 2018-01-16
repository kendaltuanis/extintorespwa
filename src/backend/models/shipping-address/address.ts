const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const gpsSchema = new Schema({
    latitude: { type: String, require: true },
    longitude: { type: String, require: true }
}, { _id: false });

const addressSchema = new Schema({
    cp: { type: String, require: true },
    suburb: { type: String, require: true },
    details: String,
    gps:[gpsSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});


export const Address = mongoose.model("ShippingAddress", addressSchema);

