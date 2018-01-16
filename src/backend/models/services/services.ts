const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const priceSchema = new Schema({
    classA: Number,
    classB: Number,
    classC: Number,
    classD: Number,
}, { _id: false });

const serviceSchema = new Schema({ 
    service: { type: String, require: true},
    type: { type: String, require: true },
    prices:[priceSchema]
});

export const Services = mongoose.model("Services", serviceSchema);

